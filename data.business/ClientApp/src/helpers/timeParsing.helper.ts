import { Prdoject, WorkingTime } from '../model/project/prdoject';
import { List } from 'linq-typescript';
import { Select } from '@material-ui/core';

export const buildProjectTotalTimeString = (project: Prdoject) => {
  let result = 'No registered timing';

  if (project?.timings && project.timings.length > 0) {
    let tottalDifference: number = extractTotalWorkingTimeTics(project);

    result = calculateTimingString(tottalDifference);
  }

  return result;
};

export const buildBulkProjectTotalTimeString = (projects: Prdoject[]) => {
  let result = '';

  if (projects) {
    let tottalDifference = 0;

    projects.forEach((project) => {
      if (project?.timings && project.timings.length > 0) {
        tottalDifference += extractTotalWorkingTimeTics(project);
      }
    });

    result = calculateTimingString(tottalDifference);
  }

  return result;
};

export const buildProfitString = (project: Prdoject) => {
  let result = 'Without profit';

  let totalProfit = calculateProfit(project);
  if (totalProfit > 0) {
    result = `${Math.fround(totalProfit).toFixed(2)}$`;
  }

  return result;
};

export const buildBulkProfitString = (projects: Prdoject[]) => {
  let result = '0.00$';

  if (projects) {
    let totalProfit = 0;

    projects.forEach((project) => {
      totalProfit += calculateProfit(project);
    });

    if (totalProfit > 0) {
      result = `${Math.fround(totalProfit).toFixed(2)}$`;
    }
  }

  return result;
};

const calculateProfit = (project: Prdoject) => {
  let totalProfit: number = 0;

  if (project?.timings && project.timings.length > 0) {
    let tottalDifference: number = extractTotalWorkingTimeTics(project);
    let hours = parseTicsToHours(tottalDifference);

    totalProfit = hours * project.rate;
  }

  return totalProfit;
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

const calculateTimingString = (totalTics: number) => {
  let result = 'No registered timing';

  let minutes = parseTicsToMinutes(totalTics);
  let hours = parseTicsToHours(totalTics);
  let days = parseTicsToDays(totalTics);

  if (minutes < 60) {
    result = calculateMinutes(minutes);
  } else {
    if (hours < 24) {
      result = calculateHours(hours);
    } else {
      result = calculateDays(days);
    }
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
