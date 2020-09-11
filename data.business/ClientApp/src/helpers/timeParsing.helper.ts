import { Prdoject, WorkingTime } from '../model/project/prdoject';
import { List } from 'linq-typescript';
import { Select } from '@material-ui/core';

export const buildTotalTimeString = (project: Prdoject) => {
  let result = 'No registered timing';

  if (project?.timings && project.timings.length > 0) {
    let tottalDifference: number = extractTotalWorkingTimeTics(project);

    let minutes = parseTicsToMinutes(tottalDifference);
    let hours = parseTicsToHours(tottalDifference);
    let days = parseTicsToDays(tottalDifference);

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

export const buildProfitString = (project: Prdoject) => {
  let result = 'Without profit';

  if (project?.timings && project.timings.length > 0) {
    let tottalDifference: number = extractTotalWorkingTimeTics(project);
    let hours = parseTicsToHours(tottalDifference);

    let totalProfit = hours * project.rate;
    if (totalProfit > 0) {
      result = `${Math.fround(totalProfit).toFixed(2)}$`;
    }
  }

  return result;
};

const parseTicsToMinutes = (tics: number) => tics / 1000 / 60;
const parseTicsToHours = (tics: number) => tics / 1000 / 60 / 60;
const parseTicsToDays = (tics: number) => tics / 1000 / 60 / 60 / 24;

const extractTotalWorkingTimeTics = (project: Prdoject) => {
  let result = 0;

  if (project?.timings && project.timings.length > 0) {
    result = new List<WorkingTime>(project.timings)
      .select((timing) => {
        let difference: number =
          timing.endedAt.getTime() - timing.startedAt.getTime();

        return difference;
      })
      .sum((difference) => difference);
  }

  return result;
};

const calculateMinutes = (minutes: number) => `${minutes} m.`;

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
