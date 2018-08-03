// @flow

import differenceInSeconds from 'date-fns/difference_in_seconds';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';
import startOfMinute from 'date-fns/start_of_minute';
import leftPad from 'left-pad';

export function sortByTime(a: timeType, b: timeType) {
  if (isBefore(a.start, b.start)) {
    return -1;
  }

  if (isAfter(a.start, b.start)) {
    return 1;
  }

  return 0;
}

export function calculateDuration(from: Date, to: Date, precise: boolean = false): number {
  if (isBefore(to, from)) {
    return 0;
  }

  return differenceInSeconds(
    precise ? to : startOfMinute(to),
    precise ? from : startOfMinute(from),
  );
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration / 60) % 60);
  const seconds = Math.floor(duration % 60);

  return `${leftPad(hours, 2, 0)}:${leftPad(minutes, 2, 0)}:${leftPad(seconds, 2, 0)}`;
}

export function timeElapsed(from: Date, to: Date, precise: boolean = false) {
  if (from === '' || to === '') {
    return 'Invalid time';
  }

  return formatDuration(calculateDuration(from, to, precise));
}

export function projectTimeEntries(
  project: projectType | { id: null, nameTree: Array<string> },
  time: Array<timeType>,
  from: Date | string,
  to: Date | string,
): Array<timeType> {
  const startOfDayFrom = startOfDay(from);
  const endOfDayTo = endOfDay(to);

  return time
    .filter(entry => entry.project === project.id)
    .filter(entry => isAfter(entry.start, startOfDayFrom) || isEqual(entry.start, startOfDayFrom))
    .filter(entry => isBefore(entry.end, endOfDayTo) || isEqual(entry.end, endOfDayTo));
}

export function totalProjectTime(
  project: projectType | { id: null, nameTree: Array<string> },
  time: Array<timeType>,
  from: Date | string,
  to: Date | string,
): number {
  return projectTimeEntries(project, time, from, to)
    .reduce((total, entry) => total + calculateDuration(entry.start, entry.end), 0);
}
