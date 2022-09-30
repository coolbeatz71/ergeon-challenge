import { FC } from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

export interface IButtonProps {
  disabled: boolean;
  className: string;
  onClick: () => void;
  type: "increment" | "decrement";
}

const Button: FC<IButtonProps> = ({ type, onClick, disabled, className }) => (
  <button onClick={onClick} disabled={disabled} className={className}>
    {type === "decrement" ? <LeftArrowIcon /> : <RightArrowIcon />}
  </button>
);

export default Button;
