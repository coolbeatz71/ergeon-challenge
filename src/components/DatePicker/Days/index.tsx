import { FC } from "react";

import styles from "./../index.module.scss";

interface IDaysProps {
  daysList: string[];
}

const Days: FC<IDaysProps> = ({ daysList }) => (
  <div className={styles.days}>
    {daysList.map((day) => (
      <div className={styles.day} key={day}>
        {day.substring(0, 3)}
      </div>
    ))}
  </div>
);

export default Days;
