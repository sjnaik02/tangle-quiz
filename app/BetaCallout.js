import React from "react";

const BetaCallout = () => {
  return (
    <div
      className="bg-red-100 border-l-4 border-l-red-400 text-red-800 px-4 py-3 rounded relative max-w-3xl mx-auto mt-8"
      role="alert"
    >
      <strong className="font-bold">Notice:</strong>
      <span className="block sm:inline">
        {" "}
        This quiz is currently in development. Please forward all feedback and
        issues to shourya@readtangle.com.
      </span>
    </div>
  );
};

export default BetaCallout;
