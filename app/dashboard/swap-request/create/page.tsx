"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CreateSwapRequestPage() {
  // State for multi-step process
  const [step, setStep] = useState(1);
  // 'both' means swap both time and room, 'time' means swap only time, 'room' means swap only room
  const [swapChoice, setSwapChoice] = useState<"both" | "time" | "room" | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  // Dummy current session details
  const currentSession = {
    subject: "Algorithm",
    day: "Monday",
    time: "08:00 - 09:30",
    section: "Section A",
    room: "415D",
  };

  const handleNextStep = () => {
    if (swapChoice && selectedDay && selectedTime) {
      setStep((step) => step + 1);
    } else {
      console.log("Please select all options");
    }
  };

  const handleSubmitRequest = () => {
    if (swapChoice === "room" && !selectedRoom) return;
    console.log("Swap Type:", swapChoice);
    console.log("Day:", selectedDay);
    console.log("Time:", selectedTime);
    if (swapChoice === "room") {
      console.log("New Room:", selectedRoom);
    }
    console.log("Reason:", reason);
    console.log("Request submitted");
    setSuccess(true);
  };

  return (
    <div className="p-6 max-w-3xl ">
      {/* Header / Back Link */}
      <div className="mb-8">
        <Link
          href="/swap-request"
          className="flex items-center gap-2 text-[#000000] mb-4"
        >
          <ChevronLeft className="h-4 w-4 text-4xl" />
          Swap Request Form
        </Link>
        <h1 className="text-2xl font-bold mb-1">Create Swap Request</h1>
        <p className="text-gray-500">
          Select a session you want to swap and a teacher to swap with
        </p>
        <hr className="absolute left-[223px] right-0 border-t border-[#d0dff6] w-screen" />
      </div>
      {/* Progress Indicator */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
          <span className="text-sm">1</span>
        </div>
        <div className="flex-1 h-1 bg-gray-200 rounded-full">
          <div
            className={`h-full bg-blue-600 rounded-full transition-all ${
              step >= 2 ? "w-full" : "w-1/2"
            }`}
          ></div>
        </div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <span className="text-sm">2</span>
        </div>
        <hr className="flex " />
      </div>
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          Request submitted successfully!
        </div>
      )}
      {/* Step 1: Choose Option & Select New Slot */}
      {step === 1 &&
        NewFunctionStep1(
          setSelectedDay,
          selectedDay,
          setSelectedTime,
          selectedTime,
          setSwapChoice,
          swapChoice,
          handleNextStep
        )}
      {/* Step 2: Review & Submit */}
      {step === 2 &&
        NewFunctionStep2(
          swapChoice,
          setSelectedRoom,
          selectedRoom,
          currentSession,
          selectedDay,
          selectedTime,
          reason,
          setReason,
          setStep,
          handleNextStep
        )}

      {step === 3 &&
        NewFunctionStep3(
          swapChoice,
          currentSession,
          selectedDay,
          selectedTime,
          selectedRoom,
          reason,
          setStep,
          handleSubmitRequest
        )}
    </div>
  );
}

function NewFunctionStep2(
  swapChoice: string | null,
  setSelectedRoom: any,
  selectedRoom: string,
  currentSession: {
    subject: string;
    day: string;
    time: string;
    section: string;
    room: string;
  },
  selectedDay: string,
  selectedTime: string,
  reason: string,
  setReason: any,
  setStep: any,
  handleNextStep: () => void
) {
  return (
    <div className="space-y-8">
      {swapChoice === "room" ? (
        // For "Change Room Only": show current session details and room selection
        <div className="grid gap-4">
          <div className=" rounded-lg p-4">
            <label className="block text-sm font-medium mb-2">
              Select New Room
            </label>
            <select
              className="w-full px-4 py-2 rounded-md bg-white border"
              onChange={(e) => setSelectedRoom(e.target.value)}
              value={selectedRoom}
            >
              <option value="">Select Room</option>
              <option value="410A">410A</option>
              <option value="410B">410B</option>
              <option value="412A">412A</option>
              <option value="412B">412B</option>
            </select>
          </div>
        </div>
      ) : (
        // For "both" or "time": show a comparison table of current vs. requested session
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="font-medium">Current Session</div>
            <div className="font-medium">Requested Change</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Subject:</span>
              <span>{currentSession.subject}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Subject:</span>
              <span>{currentSession.subject}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Day:</span>
              <span>{currentSession.day}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">New Day:</span>
              <span>{selectedDay}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Time:</span>
              <span>{currentSession.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">New Time:</span>
              <span>{selectedTime}</span>
            </div>
          </div>
          {swapChoice === "both" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Room:</span>
                <span>{currentSession.room}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">New Room:</span>
                <span>410B</span>
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Reason for Swap (optional)
        </h2>
        <Textarea
          placeholder="Provide a reason for the swap request..."
          className="min-h-24"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleNextStep}
          disabled={swapChoice === "room" && !selectedRoom}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

function NewFunctionStep3(
  swapChoice: string | null,
  currentSession: {
    subject: string;
    day: string;
    time: string;
    section: string;
    room: string;
  },
  selectedDay: string,
  selectedTime: string,
  selectedRoom: string,
  reason: string,
  setStep: any,
  handleSubmitRequest: () => void
) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Confirm Your Swap Request</h2>

      <div className="border rounded-lg bg-gray-50  overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4 bg-[#C4D9FC] ">
          <div className="font-medium ">Current Session</div>
          <div className="font-medium  ">Requested Change</div>
        </div>

        {/* Subject row - always the same */}
        <div className="grid grid-cols-2 p-4 ">
          <div className="flex items-center gap-2">
            <span className="font-medium">Subject:</span>
            <span>{currentSession.subject}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Subject:</span>
            <span>{currentSession.subject}</span>
          </div>
        </div>

        {/* Day row - changes only if swapChoice is "both" or "time" */}
        <div className="grid grid-cols-2 p-4 ">
          <div className="flex items-center gap-2">
            <span className="font-medium">Day:</span>
            <span>{currentSession.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">New Day:</span>
            <span>
              {swapChoice === "room" ? currentSession.day : selectedDay}
            </span>
          </div>
        </div>

        {/* T ime row - changes only if swapChoice is "both" or "time" */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Time:</span>
            <span>{currentSession.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">New Time:</span>
            <span>
              {swapChoice === "room" ? currentSession.time : selectedTime}
            </span>
          </div>
        </div>

        {/* Room row - changes only if swapChoice is "both" or "room" */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Room:</span>
            <span>{currentSession.room}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">New Room:</span>
            <span>
              {swapChoice === "time"
                ? currentSession.room
                : swapChoice === "room"
                ? selectedRoom
                : "410B"}
            </span>
          </div>
        </div>

        {/* Section row - doesn't change */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Section:</span>
            <span>{currentSession.section}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Section:</span>
            <span>{currentSession.section}</span>
          </div>
        </div>

        {/* Reason section */}
        {reason && (
          <div className="pt-2 border-t">
            <div className="font-medium mb-1">Reason for request:</div>
            <div className="text-gray-700">{reason}</div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleSubmitRequest}
          className="bg-[#0334BC8F] px-4 py-2 rounded-sm text-white"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
}

// function NewFunctionStep3(
//   swapChoice: string | null,
//   currentSession: {
//     subject: string;
//     day: string;
//     time: string;
//     section: string;
//     room: string;
//   },
//   selectedDay: string,
//   selectedTime: string,
//   selectedRoom: string,
//   reason: string,
//   setStep: any,
//   handleSubmitRequest: () => void
// ) {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold mb-4">Confirm Your Swap Request</h2>
//       {swapChoice === "room" ? (
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="font-medium">Current Session</div>
//           <div className="font-medium">Requested Change</div>
//         </div>

//       ) : (
//         <div></div>

//       )}

//       <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
//         <div className="grid grid-cols-2 gap-4 mb-2">
//           <div className="font-medium">Current Session</div>
//           <div className="font-medium">Request Change</div>
//           <hr className="flex justify-center px-10" />
//         </div>

//         {/* Subject row */}
//         <div className="grid grid-cols-2 gap-4 mb-2">
//           <div className="flex items-center gap-2">
//             <span className="font-medium">Subject:</span>
//             <span>{currentSession.subject}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium">Subject:</span>
//             <span>{currentSession.subject}</span>
//           </div>
//         </div>

//         {/* Day row */}
//         <div className="grid grid-cols-2 gap-4 mb-2">
//           <div className="flex items-center gap-2">
//             <span className="font-medium">Day:</span>
//             <span>{currentSession.day}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium">New Day:</span>
//             <span>
//               {swapChoice === "room" ? currentSession.day : selectedDay}
//             </span>
//           </div>
//         </div>

//         {/* Time row */}
//         <div className="grid grid-cols-2 gap-4 mb-2">
//           <div className="flex items-center gap-2">
//             <span className="font-medium">Time:</span>
//             <span>{currentSession.time}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium">New Time:</span>
//             <span>
//               {swapChoice === "room" ? currentSession.time : selectedTime}
//             </span>
//           </div>
//         </div>

//         {/* Room row */}
//         <div className="grid grid-cols-2 gap-4 mb-2">
//           <div className="flex items-center gap-2">
//             <span className="font-medium">Room:</span>
//             <span>{currentSession.room}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-medium">New Room:</span>
//             <span>
//               {swapChoice === "time"
//                 ? currentSession.room
//                 : selectedRoom || "410B"}
//             </span>
//           </div>
//         </div>

//         {/* Reason section */}
//         {reason && (
//           <div className="pt-2 border-t">
//             <div className="font-medium mb-1">Reason for request:</div>
//             <div className="text-gray-700">{reason}</div>
//           </div>
//         )}
//       </div>

//       {/* Action buttons */}
//       <div className="flex justify-end gap-4 mt-6">
//         <Button variant="outline" onClick={() => setStep(2)}>
//           Back
//         </Button>
//         <Button variant="outline">Cancel</Button>
//         <Button
//           onClick={handleSubmitRequest}
//           className="bg-[#0334BC8F] px-4 py-2 rounded-sm text-white"
//         >
//           Submit Request
//         </Button>
//       </div>
//     </div>
//   );
// }

function NewFunctionStep1(
  setSelectedDay: any,
  selectedDay: string,
  setSelectedTime: any,
  selectedTime: string,
  setSwapChoice: any,
  swapChoice: string | null,
  handleNextStep: () => void
) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <select
          className="px-4 py-2 rounded-md bg-white border"
          onChange={(e) => setSelectedDay(e.target.value)}
          value={selectedDay}
        >
          <option value="">Select Day</option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
        <select
          className="px-4 py-2 rounded-md bg-white border"
          onChange={(e) => setSelectedTime(e.target.value)}
          value={selectedTime}
        >
          <option value="">Select Time</option>
          <option value="08:00-09:30">08:00 - 09:30</option>
          <option value="09:40-11:10">09:40 - 11:10</option>
          <option value="11:20-12:50">11:20 - 12:50</option>
          <option value="13:00-14:30">13:00 - 14:30</option>
          <option value="14:40-16:10">14:40 - 16:10</option>
          <option value="16:20-17:50">16:20 - 17:50</option>
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-medium text-[#09090B] mb-4">
          Choose the Desired Swap Type
        </legend>
        <div className="pl-3 space-y-3">
          <label className="flex items-center space-x-2">
            <input
              onChange={(e) => setSwapChoice(e.target.value as "both")}
              type="radio"
              name="swapType"
              value="both"
              checked={swapChoice === "both"}
            />
            <span>Swap Entire Session (Time & Room)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              onChange={(e) => setSwapChoice(e.target.value as "room")}
              type="radio"
              name="swapType"
              value="room"
              checked={swapChoice === "room"}
            />
            <span>Change Room Only (Keep Same Time)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              onChange={(e) => setSwapChoice(e.target.value as "time")}
              type="radio"
              name="swapType"
              value="time"
              checked={swapChoice === "time"}
            />
            <span>Change Time Only (Keep Same Room)</span>
          </label>
        </div>
      </fieldset>
      <div className="flex justify-center gap-4">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleNextStep}
          disabled={!swapChoice || !selectedDay || !selectedTime}
          className="bg-[#0334BC8F] px-4 py-2 rounded-sm text-white"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
