import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;