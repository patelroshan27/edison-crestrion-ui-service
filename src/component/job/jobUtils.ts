import moment from 'moment';

export const MONTHS = moment.months().map((label, index) => ({
  label,
  number: index + 1,
}));

export const DAYS_OF_WEEK = moment.weekdays().map((label, index) => ({
  label,
  number: index,
}));
