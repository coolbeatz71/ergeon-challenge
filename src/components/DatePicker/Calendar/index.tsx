import { FC } from "react";
import { BLACK_COLOR, WHITE_COLOR } from "../../../constants/colors";

import styles from "./../index.module.scss";

interface ICalendarProps {
  day: Date;
  minDate: Date;
  maxDate: Date;
  month: number;
  colorScheme: string;
  onSelectDate: () => void;
  selectedDate: Date | null;
}

const Calendar: FC<ICalendarProps> = ({
  day,
  month,
  minDate,
  maxDate,
  colorScheme,
  selectedDate,
  onSelectDate,
}) => {
  const today = new Date();
  const highlightToday =
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear();

  return (
    <div
      className={[
        styles.date,
        day.getMonth() === month ? styles.inside : styles.outside,
      ].join(" ")}
    >
      <button
        style={{
          opacity: highlightToday ? 0.3 : 1,
          backgroundColor:
            selectedDate?.getTime() === day.getTime() || highlightToday
              ? colorScheme
              : WHITE_COLOR,
          color:
            selectedDate?.getTime() === day.getTime()
              ? WHITE_COLOR
              : BLACK_COLOR,
        }}
        onClick={onSelectDate}
        disabled={
          day.getTime() < minDate.getTime() || day.getTime() > maxDate.getTime()
        }
      >
        {day.getDate()}
      </button>
    </div>
  );
};

export default Calendar;
