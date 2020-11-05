export const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
  var dateParts = cellValue.split('/');
  var day = Number(dateParts[0]);
  var month = Number(dateParts[1]) - 1;
  var year = Number(dateParts[2]);
  var cellDate = new Date(year, month, day);
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  } else if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  } else {
    return 0;
  }
};
