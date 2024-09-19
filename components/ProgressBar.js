// currently unused
import React from "react";
import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ answered, total }) => (
  <div className="sticky top-0 z-10 bg-white px-3 py-3 shadow-md sm:px-4">
    <div className="flex items-center justify-between">
      <div className="mr-4 w-full">
        <Progress value={(answered / total) * 100} className="h-1.5" />
      </div>
      <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">{`You've answered ${answered} of ${total}`}</p>
    </div>
  </div>
);

export default ProgressBar;
