import {
  Box,
  Button,
  Checkbox,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { DatePicker } from "@mui/x-date-pickers";
import { endOfMonth, format, isSameDay, startOfMonth } from "date-fns";
import React from "react";
import { useInputsGetByDate } from "../../data/actions/inputs-get-by-date";
import { useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { TInput } from "../../types";
import { useQuery } from "../../utils/query";
import { InputValue } from "../base/InputValue";
import { Layout } from "../base/Layout";
import { FilterAlt } from "@mui/icons-material";
import { primaryGradient } from "../../utils/gradient";

type TInputDisplayDay = {
  date: string;
  inputs: { [key: string]: TInput[] };
};

export const CompareView: React.FC = () => {
  const query = useQuery();
  const { state } = useStore();
  const [filtersOpen, setFiltersOpen] = React.useState(true);
  const getTracker = useGetTracker();
  const [trackerIds, setTrackerIds] = React.useState<string[]>(() => {
    return query.get("trackers")?.split(",").filter(Boolean) || [];
  });

  const [dateFrom, setDateFrom] = React.useState(startOfMonth(new Date()));
  const [dateTo, setDateTo] = React.useState(endOfMonth(new Date()));

  // load the inputs
  const { load, loading } = useInputsGetByDate();
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
    <Layout title="Compare Data" back="/">
      <Drawer
        anchor="right"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      >
        <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
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
        <Typography
          sx={{
            fontSize: 12,
            p: 1,
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.05)",
            borderTop: `1px solid rgba(224, 224, 224, 1);`,
            borderBottom: `1px solid rgba(224, 224, 224, 1);`,
          }}
        >
          Trackers
        </Typography>
        <List sx={{ pt: 0 }}>
          {state.trackers.length ? (
            state.trackers.map((tracker) => {
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
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => {
              setFiltersOpen(false);
            }}
          >
            Done
          </Button>
        </Box>
      </Drawer>

      <TableContainer sx={{ mt: 2 }}>
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
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 14,
          right: 14,
          background: primaryGradient,
        }}
        onClick={() => {
          setFiltersOpen(true);
        }}
        aria-label="set filters"
      >
        <FilterAlt />
      </Fab>
    </Layout>
  );
};
