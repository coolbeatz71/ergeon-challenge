import { FC } from "react";

interface ISelectYearProps {
  year: number;
  minDate: Date;
  maxDate: Date;
  setYear: (val: number) => void;
}

const SelectYear: FC<ISelectYearProps> = ({
  year,
  setYear,
  minDate,
  maxDate,
}) => (
  <select onChange={(e) => setYear(parseInt(e.target.value))} value={year}>
    {Array(maxDate.getFullYear() - minDate.getFullYear() + 1)
      .fill(0)
      .map((_, index) => (
        <option key={index} value={maxDate.getFullYear() - index}>
          {maxDate.getFullYear() - index}
        </option>
      ))}
  </select>
);

export default SelectYear;
