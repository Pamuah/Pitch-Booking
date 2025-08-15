import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = ({
  title,
  trailingIcon,
  onPress,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`px-2 py-1 rounded-full inline-flex items-center justify-center font-bold transition duration-150 gap-x-2 
        ${
          disabled
            ? "bg-gray-400 opacity-50 cursor-not-allowed"
            : "bg-lime-300 hover:bg-lime-500 active:scale-95"
        } 
        ${className}`}
    >
      <span>{title}</span>
      {trailingIcon && <FontAwesomeIcon icon={trailingIcon} />}
    </button>
  );
};

export default CustomButton;
