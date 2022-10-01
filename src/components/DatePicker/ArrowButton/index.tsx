import { FC } from "react";
import LeftArrowIcon from "../LeftArrowIcon";
import RightArrowIcon from "../RightArrowIcon";

import styles from "./../index.module.scss";

export interface IArrowButtonProps {
  disabled: boolean;
  onClick: () => void;
  type: "increment" | "decrement";
}

const ArrowButton: FC<IArrowButtonProps> = ({ type, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={styles.navButton}>
    {type === "decrement" ? <LeftArrowIcon /> : <RightArrowIcon />}
  </button>
);

export default ArrowButton;
