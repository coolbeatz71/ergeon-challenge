import { FC } from "react";

interface ISelectMonthsProps {
  month: number;
  monthsList: string[];
  setMonth: (val: number) => void;
}

const SelectMonths: FC<ISelectMonthsProps> = ({
  monthsList,
  setMonth,
  month,
}) => (
  <select onChange={(e) => setMonth(parseInt(e.target.value))} value={month}>
    {monthsList.map((monthName, index) => (
      <option key={index} value={index}>
        {monthName}
      </option>
    ))}
  </select>
);
export default SelectMonths;
