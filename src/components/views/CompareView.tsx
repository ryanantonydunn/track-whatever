import {
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
  Typography,
} from "@mui/material";
import React from "react";
// import { useParams } from "react-router-dom";
// import { useInputsByTracker } from "../../data/hooks";
import { format, isSameDay } from "date-fns";
import { useGetInputsByTracker, useGetTracker } from "../../data/hooks";
import { useStore } from "../../data/provider";
import { TInput } from "../../types";
import { arrayObjSort } from "../../utils/sort";
import { Layout } from "../base/Layout";
import { InputValue } from "../base/InputValue";
import { useExpandMore } from "../base/ExpandMore";

// type TParams = {
//   compareId: string;
// };

type TInputDisplayDay = {
  date: string;
  inputs: { [key: string]: TInput[] };
};

export const CompareView: React.FC = () => {
  // const { compareId } = useParams<TParams>();
  const expandMore = useExpandMore({
    iconLabelOpen: "Hide trackers",
    iconLabelClosed: "Show trackers",
    defaultOpen: true,
  });
  const compare = { title: "Compare Data" };
  const { state } = useStore();
  const getInputsByTracker = useGetInputsByTracker();
  const getTracker = useGetTracker();
  const [trackerIds, setTrackerIds] = React.useState<string[]>([]);

  // get the data based on the selected trackers
  const inputDisplayByDay = React.useMemo<TInputDisplayDay[]>(() => {
    const inputs = arrayObjSort<TInput>(
      trackerIds.map((id) => getInputsByTracker(id)).flat(),
      "date"
    );
    const days: TInputDisplayDay[] = [];
    inputs.forEach((input, i) => {
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
  }, [trackerIds, getInputsByTracker]);

  return (
    <Layout title={compare.title} back="/">
      <Container maxWidth="xl">
        <Paper>
          <Stack direction="row" alignItems="middle" sx={{ p: 2 }}>
            <Typography component="h3" variant="h6" sx={{ flex: 1 }}>
              Select Trackers
            </Typography>
            {expandMore.icon}
          </Stack>
          <Collapse in={expandMore.open} timeout="auto" unmountOnExit>
            <List sx={{ pt: 0 }}>
              {state.trackers.length ? (
                state.trackers.map((tracker) => {
                  // const tracker = getTracker(trackerId);
                  // if (!tracker) return null;
                  return (
                    <ListItem key={tracker.id} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          if (trackerIds.includes(tracker.id)) {
                            setTrackerIds(
                              trackerIds.filter((t) => t !== tracker.id)
                            );
                          } else {
                            setTrackerIds([...trackerIds, tracker.id]);
                          }
                        }}
                        sx={{ pt: 0, pb: 0 }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={trackerIds.includes(tracker.id)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": `tracker-label-${tracker.id}`,
                            }}
                            size="small"
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={`tracker-label-${tracker.id}`}
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
          {inputDisplayByDay.length ? (
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
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
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
                              key={input.id}
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
