import React from "react";
import { IButton } from "../../utils/Interfaces/interfaces";
import "./Button.scss";

const Button: React.FC<IButton> = ({
  text,
  type,
  disabled,
  className,
  removePercentage,
  ...props
}) => {
  return (
    <button
      className={`Button ${type === "focused" ? "focused" : ""} ${className}`}
      value={text}
      disabled={disabled}
      {...props}
    >
      {text}
      {!removePercentage && "%"}
    </button>
  );
};

export default Button;
