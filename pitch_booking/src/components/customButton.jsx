import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = ({ title, trailingIcon, onPress, className = "" }) => {
  return (
    <button
      className={`bg-lime-300 text-black px-2 py-1 rounded-full inline-flex items-center justify-center font-bold hover:bg-lime-500 active:scale-95 transition duration-150 gap-x-2 ${className}`}
      onClick={onPress}
    >
      <span>{title}</span>
      {trailingIcon && <FontAwesomeIcon icon={trailingIcon} />}
    </button>
  );
};

export default CustomButton;
