import { memo, useEffect, useRef, useState } from "react";
import {
  DAY_NAMES,
  MAX_YEAR,
  MIN_YEAR,
  MONTH_NAMES,
} from "../../constants/app";
import {
  BLACK_COLOR,
  DEFAULT_COLOR_SCHEME,
  WHITE_COLOR,
} from "../../constants/colors";
import Days from "../Days";
import Button from "../Button";
import { changeMonth, getHeader, selectDate } from "../../utils";

import styles from "./index.module.scss";

interface Props {
  minDate?: Date;
  maxDate?: Date;
  isOpen?: boolean;
  closeText?: string;
  clearText?: string;
  defaultValue?: Date;
  dayNames?: string[];
  colorScheme?: string;
  onClose?: () => void;
  monthNames?: string[];
  headerTextColor?: string;
  dateDisplayFormat?: string;
  onChange?: (date: Date | null) => void;
}

const DatePicker = ({
  onClose,
  onChange,
  dayNames,
  monthNames,
  dateDisplayFormat,
  closeText = "Close",
  clearText = "Clear",
  isOpen: showCalendar,
  defaultValue = new Date(),
  headerTextColor = WHITE_COLOR,
  colorScheme = DEFAULT_COLOR_SCHEME,
  minDate = new Date(MIN_YEAR, 0, 1),
  maxDate = new Date(MAX_YEAR, 11, 31),
}: Props) => {
  const [isOpen, setIsOpen] = useState(showCalendar);
  const [calendar, setCalendar] = useState<Date[]>([]);
  const [days] = useState<string[]>(
    dayNames?.length === 7 ? dayNames : DAY_NAMES,
  );
  const [months] = useState<string[]>(
    monthNames?.length === 12 ? monthNames : MONTH_NAMES,
  );
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(2022);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    defaultValue || null,
  );
  const dbRef = useRef<HTMLDivElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setSelectedDate(null);
    onChange && onChange(null);
  };

  const handleClose = () => {
    dbRef.current?.classList.add(styles.fadeOut);
    lbRef.current?.classList.add(styles.zoomOut);

    setTimeout(() => {
      setIsOpen(false);
      onClose && onClose();
      dbRef.current?.classList.remove(styles.fadeOut);
      lbRef.current?.classList.remove(styles.zoomOut);
    }, 300);
  };

  useEffect(() => {
    const temp = [];
    const firstDayThisMonth = new Date(year, month, 1).getDay();

    for (let i = 0; i < 42; i++) {
      const date = new Date(year, month, i - firstDayThisMonth + 1);
      temp.push(date);
    }

    setCalendar(temp);
  }, [month, year]);

  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.getTime() < minDate.getTime()) {
        setMonth(minDate.getMonth());
        setSelectedDate(minDate);
      } else setMonth(defaultValue.getMonth());
    }
  }, []);

  useEffect(() => {
    setIsOpen(showCalendar);
  }, [showCalendar]);

  if (!isOpen) return null;

  return (
    <div className={styles.container} ref={dbRef}>
      <div className={styles.content} ref={lbRef}>
        <div
          className={styles.header}
          style={{
            backgroundColor: colorScheme,
            color: headerTextColor,
          }}
        >
          <h4 className={styles.title}>Select Date</h4>
          <span className={styles.monthName}>
            {getHeader({
              days,
              months,
              selectedDate,
              dateDisplayFormat,
            })}
          </span>
          <br />
          <span className={styles.year}>
            {selectedDate ? selectedDate.getFullYear() : year}
          </span>
        </div>

        <div className={styles.nav}>
          <div className={styles.selector}>
            <select
              onChange={(e) => setMonth(parseInt(e.target.value))}
              value={month}
            >
              {months.map((monthName, index) => (
                <option key={index} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setYear(parseInt(e.target.value))}
              value={year}
            >
              {Array(maxDate.getFullYear() - minDate.getFullYear() + 1)
                .fill(0)
                .map((_, index) => (
                  <option key={index} value={maxDate.getFullYear() - index}>
                    {maxDate.getFullYear() - index}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.prevNext}>
            <Button
              type="decrement"
              className={styles.navButton}
              disabled={
                minDate.getFullYear() === year && minDate.getMonth() === month
              }
              onClick={() =>
                changeMonth({ increment: -1, year, month, setYear, setMonth })
              }
            />
            <Button
              type="increment"
              className={styles.navButton}
              disabled={
                maxDate.getFullYear() === year && maxDate.getMonth() === month
              }
              onClick={() =>
                changeMonth({ increment: +1, year, month, setYear, setMonth })
              }
            />
          </div>
        </div>

        <div className={styles.body}>
          <Days
            daysList={days}
            contentClassName={styles.day}
            containerClassName={styles.days}
          />
          <div className={styles.calendar}>
            {calendar.map((day, index) => (
              <div
                className={[
                  styles.date,
                  day.getMonth() === month ? styles.inside : styles.outside,
                ].join(" ")}
                key={index}
              >
                <button
                  style={{
                    opacity:
                      day.getDate() === defaultValue.getDate() &&
                      day.getMonth() === defaultValue.getMonth()
                        ? 0.3
                        : 1,
                    backgroundColor:
                      selectedDate?.getTime() === day.getTime() ||
                      (day.getDate() === defaultValue.getDate() &&
                        day.getMonth() === defaultValue.getMonth())
                        ? colorScheme
                        : WHITE_COLOR,
                    color:
                      selectedDate?.getTime() === day.getTime()
                        ? WHITE_COLOR
                        : BLACK_COLOR,
                  }}
                  onClick={() =>
                    selectDate({
                      day,
                      setYear,
                      onChange,
                      setMonth,
                      setSelectedDate,
                    })
                  }
                  disabled={
                    day.getTime() < minDate.getTime() ||
                    day.getTime() > maxDate.getTime()
                  }
                >
                  {day.getDate()}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            onClick={handleClear}
            disabled={!selectedDate}
            style={{ color: colorScheme }}
          >
            {clearText}
          </button>
          <button style={{ color: colorScheme }} onClick={handleClose}>
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(DatePicker);
