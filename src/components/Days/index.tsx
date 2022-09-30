import { FC } from "react";

interface IDaysProps {
  daysList: string[];
  contentClassName: string;
  containerClassName: string;
}

const Days: FC<IDaysProps> = ({
  daysList,
  contentClassName,
  containerClassName,
}) => (
  <div className={containerClassName}>
    {daysList.map((day) => (
      <div className={contentClassName} key={day}>
        {day.substring(0, 3)}
      </div>
    ))}
  </div>
);

export default Days;
