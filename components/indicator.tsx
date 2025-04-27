import Checkin from "@/public/assets/check";
import * as React from "react";

export interface IndicatorProps {}

export const Indicator: React.FC<IndicatorProps> = () => {
  return (
    <div className="pl-6 flex flex-row items-center justify-center ">
        <div className="flex flex-col items-center justify-center">
       <Checkin />
       <span className="font-bold">
        Step 1
       </span>
       </div>
       <div className="w-14 h-0.5 mb-5 bg-[#3d659c]">
       </div>
       <div className="flex flex-col items-center justify-center">
       <Checkin />
       <span className="font-bold">
        Step 2
       </span>
       </div>
       </div>
  );
};
