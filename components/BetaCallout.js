import React from "react";

const BetaCallout = () => {
  return (
    <div
      className="relative mx-auto mt-8 w-full max-w-3xl rounded border-l-4 border-l-red-400 bg-red-100 px-4 py-3 text-base text-red-800"
      role="alert"
    >
      <strong className="font-bold">Notice:</strong>
      <span className="block sm:inline">
        {" "}
        This quiz is currently in development. Please forward all feedback and
        issues to{" "}
        <a
          href="mailto:shourya@readtangle.com"
          target="_blank"
          className="underline"
        >
          me
        </a>
        .
      </span>
    </div>
  );
};

export default BetaCallout;
