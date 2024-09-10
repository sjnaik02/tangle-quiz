// File: components/ProgressBar.jsx
import React from "react";
import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ answered, total }) => (
  <div className="sticky top-0 bg-white p-4 z-10 border border-gray-300">
    <Progress value={(answered / total) * 100} className="h-2" />
    <p className="text-sm text-gray-600 mt-2 text-right">{`${answered} of ${total} questions answered`}</p>
  </div>
);

export default ProgressBar;
