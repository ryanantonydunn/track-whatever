import {
  Box,
  Checkbox,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { endOfMonth, format, isSameDay, startOfMonth } from "date-fns";
import React from "react";
import { useLoadInputs } from "../../data/actions/inputs-get";
import { useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { TInput } from "../../types";
import { useQuery } from "../../utils/query";
import { useExpandMore } from "../base/ExpandMore";
import { InputValue } from "../base/InputValue";
import { Layout } from "../base/Layout";
import { DatePicker } from "@mui/x-date-pickers";

// type TParams = {
//   compareId: string;
// };

type TInputDisplayDay = {
  date: string;
  inputs: { [key: string]: TInput[] };
};

export const CompareView: React.FC = () => {
  const query = useQuery();
  // const { compareId } = useParams<TParams>();
  const expandMore = useExpandMore({
    iconLabelOpen: "Hide trackers",
    iconLabelClosed: "Show trackers",
    defaultOpen: true,
  });
  const compare = { title: "Compare Data" };
  const { state } = useStore();
  const getTracker = useGetTracker();
  const [trackerIds, setTrackerIds] = React.useState<string[]>(() => {
    return query.get("trackers")?.split(",").filter(Boolean) || [];
  });

  const [dateFrom, setDateFrom] = React.useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = React.useState(endOfMonth(new Date()));

  // load the inputs
  const { load, loading } = useLoadInputs();
  React.useEffect(() => {
    load({
      trackerIds,
      dateFrom,
      dateTo,
    });
  }, [load, trackerIds, dateFrom, dateTo]);

  // get the data based on the selected trackers
  const inputDisplayByDay = React.useMemo<TInputDisplayDay[]>(() => {
    const days: TInputDisplayDay[] = [];
    state.inputs.forEach((input, i) => {
      // check if we are still on the same day
      const previousDay = days[days.length - 1];
      const previousDayDate = previousDay?.date;
      if (
        previousDay &&
        isSameDay(new Date(previousDayDate), new Date(input.date))
      ) {
        // add this input to the same day
        previousDay.inputs[input.trackerId] =
          previousDay.inputs[input.trackerId] || [];
        previousDay.inputs[input.trackerId].push(input);
      } else {
        // add a new day
        days.push({
          date: input.date,
          inputs: { [input.trackerId]: [input] },
        });
      }
    });

    return days;
  }, [state.inputs]);

  return (
    <Layout title={compare.title} back="/">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" sx={{ py: 2 }}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date from"
            value={dateFrom}
            maxDate={dateTo}
            onChange={(newValue) => {
              setDateFrom(newValue || startOfMonth(new Date()));
            }}
          />
          <Box sx={{ mx: 2 }}> to </Box>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date to"
            value={dateTo}
            minDate={dateFrom}
            onChange={(newValue) => {
              setDateTo(newValue || endOfMonth(new Date()));
            }}
          />
        </Stack>
        <Paper sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", top: 2, right: 2, zIndex: 10 }}>
            {expandMore.icon}
          </Box>
          <Typography sx={{ px: 2, py: 1, fontSize: 14 }} component="h3">
            Trackers
          </Typography>
          <Collapse in={expandMore.open} timeout="auto" unmountOnExit>
            <List sx={{ pt: 0 }}>
              {state.trackers.length ? (
                state.trackers.map((tracker) => {
                  // const tracker = getTracker(trackerId);
                  // if (!tracker) return null;
                  return (
                    <ListItem key={tracker._id} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          if (trackerIds.includes(tracker._id)) {
                            setTrackerIds(
                              trackerIds.filter((t) => t !== tracker._id)
                            );
                          } else {
                            setTrackerIds([...trackerIds, tracker._id]);
                          }
                        }}
                        sx={{ pt: 0, pb: 0 }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={trackerIds.includes(tracker._id)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": `tracker-label-${tracker._id}`,
                            }}
                            size="small"
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={`tracker-label-${tracker._id}`}
                          primary={tracker.title}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <Typography align="center" sx={{ p: 2 }}>
                  No trackers to compare
                </Typography>
              )}
            </List>
          </Collapse>
        </Paper>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          {loading ? null : inputDisplayByDay.length ? (
            <Table size="small" aria-label="tracker inputs">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  {trackerIds.map((trackerId) => (
                    <TableCell key={trackerId}>
                      {getTracker(trackerId)?.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {inputDisplayByDay.map((inputDay) => (
                  <TableRow
                    key={inputDay.date}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {format(new Date(inputDay.date), "d MMM yyyy")}
                    </TableCell>
                    {trackerIds.map((trackerId) => (
                      <TableCell
                        key={`${inputDay.date}-${trackerId}`}
                        sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
                      >
                        {inputDay.inputs[trackerId]?.map((input) => {
                          return (
                            <Stack
                              direction="row"
                              alignItems="center"
                              key={input._id}
                              sx={{ mb: 1, mt: 1 }}
                            >
                              <Typography
                                sx={{
                                  color: "grey.500",
                                  fontSize: "0.8em",
                                  mr: 2,
                                }}
                              >
                                {format(new Date(input.date), "HH:mm")}
                              </Typography>
                              <Typography
                                sx={{
                                  maxWidth: "400px",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                <InputValue input={input} />
                              </Typography>
                            </Stack>
                          );
                        })}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography align="center" sx={{ p: 2 }}>
              {trackerIds.length ? "No inputs yet" : "No trackers selected"}
            </Typography>
          )}
        </TableContainer>
      </Container>
    </Layout>
  );
};
