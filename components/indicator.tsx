import Checkin from "@/public/assets/check";
import * as React from "react";

export interface IndicatorProps {
  phase: number;
}


export const Indicator: React.FC<IndicatorProps> = ({ phase }) => {
  const steps = [1, 2];
  
  return (
    <div className="pl-6 flex flex-row items-center justify-center gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center justify-center">
            {phase >= step ? <Checkin /> : <div className="w-6 h-6 border rounded-full" />}
            <span className="font-bold">Step {step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-14 h-0.5 mb-5 ${phase > step ? 'bg-[#3d659c]' : 'bg-gray-300'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
