import {
  IHeaderParams,
  ISelectDateParams,
  IChangeMonthParams,
} from "../interfaces";

export const selectDate = ({
  day,
  setMonth,
  setYear,
  setSelectedDate,
  onChange,
}: ISelectDateParams): void => {
  setMonth(day.getMonth());
  setYear(day.getFullYear());
  setSelectedDate(day);
  onChange && onChange(day);
};

export const changeMonth = ({
  year,
  month,
  setYear,
  setMonth,
  increment,
}: IChangeMonthParams) => {
  let currentMonth = month + increment;
  let currentYear = year;

  if (currentMonth === 12) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth === -1) {
    currentMonth = 11;
    currentYear--;
  }

  setMonth(currentMonth);
  setYear(currentYear);
};

export const getHeader = ({
  days,
  months,
  selectedDate,
  dateDisplayFormat,
}: IHeaderParams) => {
  const backup = new Date();
  const dayName = days[selectedDate?.getDay() || backup.getDay()];
  const dateNum = selectedDate ? selectedDate.getDate() : backup.getDate();
  const date = dateNum < 10 ? `0${dateNum}` : dateNum.toString();
  const monthName = months[selectedDate?.getMonth() || backup.getMonth()];
  const monthNum =
    (selectedDate ? selectedDate.getMonth() : backup.getMonth()) + 1;
  const monthWithZero = monthNum < 10 ? `0${monthNum}` : monthNum.toString();
  let result = dateDisplayFormat || "DD, MM dd";

  result = result.replaceAll("D", "_D");
  result = result.replaceAll("M", "_M");
  result = result.replaceAll("d", "_d");
  result = result.replaceAll("m", "_m");

  result = result.replaceAll("_D_D", dayName);
  result = result.replaceAll("_D", dayName.substring(0, 3));
  result = result.replaceAll("_M_M", monthName);
  result = result.replaceAll("_M", monthName.substring(0, 3));
  result = result.replaceAll("_m_m", monthWithZero);
  result = result.replaceAll("_m", monthNum.toString());
  result = result.replaceAll("_d_d", date);
  result = result.replaceAll("_d", date.replace(/^0/, ""));

  return result;
};
