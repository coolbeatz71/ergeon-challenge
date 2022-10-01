import { FC } from "react";
import { BLACK_COLOR, WHITE_COLOR } from "../../../constants/colors";
import styles from "./../index.module.scss";

interface ICalendarProps {
  day: Date;
  minDate: Date;
  maxDate: Date;
  month: number;
  defaultDate: Date;
  colorScheme: string;
  selectedDate: Date | null;
  onSelectDate: () => void;
}

const Calendar: FC<ICalendarProps> = ({
  day,
  month,
  minDate,
  maxDate,
  defaultDate,
  colorScheme,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <div
      className={[
        styles.date,
        day.getMonth() === month ? styles.inside : styles.outside,
      ].join(" ")}
    >
      <button
        style={{
          opacity:
            day.getDate() === defaultDate.getDate() &&
            day.getMonth() === defaultDate.getMonth()
              ? 0.3
              : 1,
          backgroundColor:
            selectedDate?.getTime() === day.getTime() ||
            (day.getDate() === defaultDate.getDate() &&
              day.getMonth() === defaultDate.getMonth())
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
