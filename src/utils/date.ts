export const getDateDiffInDays = (date1: Date, date2: Date) => {
  if (!(date1 instanceof Date)) date1 = new Date(date1);
  return Math.floor(
    Math.abs(date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)
  );
};
