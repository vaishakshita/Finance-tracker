"use client";

import { ImSpinner2 } from "react-icons/im";

const ButtonLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ImSpinner2 className="animate-spin text-lg" />
      <span>{text}</span>
    </div>
  );
};

export default ButtonLoader;