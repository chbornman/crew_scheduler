import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  differenceInDays,
  addWeeks,
  addMonths,
} from "date-fns";
import { ViewMode } from "./types";

export const getDateRange = (date: Date, viewMode: ViewMode) => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday

  switch (viewMode) {
    case "week":
      return {
        start,
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case "twoWeek":
      return {
        start,
        end: addDays(endOfWeek(date, { weekStartsOn: 1 }), 7),
      };
    case "month":
      return {
        start,
        end: addDays(start, 27), // 4 weeks
      };
    case "quarter":
      return {
        start,
        end: addMonths(start, 3),
      };
    case "year":
      return {
        start,
        end: addMonths(start, 12),
      };
    default:
      return {
        start,
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
  }
};

export const getDaysInRange = (startDate: Date, endDate: Date) => {
  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const calculatePosition = (
  assignmentStart: Date,
  assignmentEnd: Date,
  rangeStart: Date,
  rangeEnd: Date,
  totalWidth: number,
) => {
  const totalDays = differenceInDays(rangeEnd, rangeStart) + 1;
  const dayWidth = totalWidth / totalDays;

  // Calculate start position
  const startDiff = Math.max(0, differenceInDays(assignmentStart, rangeStart));
  const left = startDiff * dayWidth;

  // Calculate width
  const effectiveStart =
    assignmentStart < rangeStart ? rangeStart : assignmentStart;
  const effectiveEnd = assignmentEnd > rangeEnd ? rangeEnd : assignmentEnd;
  const duration = differenceInDays(effectiveEnd, effectiveStart) + 1;
  const width = duration * dayWidth;

  return { left, width };
};

export const formatDateHeader = (date: Date) => {
  return format(date, "EEE d");
};

export const formatMonthYear = (date: Date) => {
  return format(date, "MMMM yyyy");
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
