import { Prdoject, WorkingTime } from '../model/project/prdoject';
import { List } from 'linq-typescript';
import { Select } from '@material-ui/core';

export const calculateTotalTime = (project: Prdoject) => {
  let result = 'No registered timing';

  if (project?.timings && project.timings.length > 0) {
    let tottalDifference: number = new List<WorkingTime>(project.timings)
      .select((timing) => {
        let difference: number =
          timing.endedAt.getTime() - timing.startedAt.getTime();

        return difference;
      })
      .sum((difference) => difference);

    let minutes = tottalDifference / 1000 / 60;
    let hours = tottalDifference / 1000 / 60 / 60;
    let days = tottalDifference / 1000 / 60 / 60 / 24;

    debugger;
    if (minutes < 60) {
      result = calculateMinutes(minutes);
    } else {
      if (hours < 24) {
        result = calculateHours(hours);
      } else {
        result = calculateDays(days);
      }
    }
  }

  return result;
};

const calculateMinutes = (minutes: number) => `${minutes} minutes`;

const calculateHours = (hours: number) => {
  let result = '';
  let flooredGours = Math.floor(hours);

  if (hours > flooredGours) {
    let detailedMinutes = Math.floor((hours - flooredGours) * 60);

    if (detailedMinutes > 0) {
      result = `${flooredGours} h. ${detailedMinutes} m.`;
    } else {
      result = `${flooredGours} h.`;
    }
  } else {
    result = `${flooredGours} h`;
  }

  return result;
};

const calculateDays = (days: number) => {
  debugger;
  let result = '';
  let flooredDays = Math.floor(days);

  if (days > flooredDays) {
    let detailedHours = Math.floor((days - flooredDays) * 24);

    if (detailedHours > 0) {
      result = `${flooredDays} d. ${detailedHours} h.`;
    } else {
      result = `${flooredDays} d.`;
    }
  } else {
    result = `${flooredDays} d.`;
  }

  return result;
};
