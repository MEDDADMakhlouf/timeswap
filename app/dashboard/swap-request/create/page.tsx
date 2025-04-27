// // "use client";

import Firstpage from "@/components/firstpage";
import { Indicator } from "@/components/indicator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { ChevronLeft } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Textarea } from "@/components/ui/textarea";

// // export default function CreateSwapRequestPage() {
// //   const [step, setStep] = useState(1);
// //   const [swapType, setSwapType] = useState("entire");
// //   const [selectedDay, setSelectedDay] = useState<string | null>(null);
// //   const [selectedTime, setSelectedTime] = useState<string | null>(null);
// //   const [selectedSession, setSelectedSession] = useState<boolean>(false);

// //   const handleNextStep = () => {
// //     if (step === 1) {
// //       setStep(2);
// //     }
// //   };

// //   const handleSelectSession = () => {
// //     setSelectedSession(true);
// //   };

// //   return (
// //     <div className="p-6">
// //       <div className="mb-8">
// //         <Link
// //           href="/swap-request"
// //           className="flex items-center gap-2 text-blue-600 mb-4"
// //         >
// //           <ChevronLeft className="h-4 w-4" />
// //           Swap Request Form
// //         </Link>

// //         <h1 className="text-2xl font-bold mb-1">Create Swap Request</h1>
// //         <p className="text-gray-500">
// //           Select a session you want to swap and a teacher to swap with
// //         </p>
// //       </div>

// //       <div className="flex items-center gap-4 mb-8">
// //         <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
// //           <svg
// //             width="20"
// //             height="20"
// //             viewBox="0 0 20 20"
// //             fill="none"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <path
// //               d="M16.6666 5L7.49992 14.1667L3.33325 10"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             />
// //           </svg>
// //         </div>
// //         <div className="flex-1 h-1 bg-gray-200 rounded-full">
// //           <div
// //             className={`h-full bg-blue-600 rounded-full ${
// //               step >= 2 ? "w-full" : "w-0"
// //             }`}
// //           ></div>
// //         </div>
// //         <div
// //           className={`flex items-center justify-center w-8 h-8 rounded-full ${
// //             step >= 2
// //               ? "bg-blue-100 text-blue-600"
// //               : "bg-gray-100 text-gray-400"
// //           }`}
// //         >
// //           <svg
// //             width="20"
// //             height="20"
// //             viewBox="0 0 20 20"
// //             fill="none"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <path
// //               d="M16.6666 5L7.49992 14.1667L3.33325 10"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             />
// //           </svg>
// //         </div>
// //       </div>

// //       <div className="flex gap-4 text-sm font-medium text-gray-500 mb-4">
// //         <div className="text-blue-600">Step {step}</div>
// //       </div>

// //       <div className="border-t pt-6">
// //         {step === 1 ? (
// //           <div className="space-y-8">
// //             <div>
// //               <h2 className="text-lg font-semibold mb-4">
// //                 Select a New Time Slot
// //               </h2>
// //               {!selectedSession ? (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <Select onValueChange={(value) => setSelectedDay(value)}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select a Day" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="saturday">Saturday</SelectItem>
// //                       <SelectItem value="sunday">Sunday</SelectItem>
// //                       <SelectItem value="monday">Monday</SelectItem>
// //                       <SelectItem value="tuesday">Tuesday</SelectItem>
// //                       <SelectItem value="wednesday">Wednesday</SelectItem>
// //                       <SelectItem value="thursday">Thursday</SelectItem>
// //                     </SelectContent>
// //                   </Select>

// //                   <Select onValueChange={(value) => setSelectedTime(value)}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select a time" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="8-930">08:00 - 09:30</SelectItem>
// //                       <SelectItem value="940-1110">09:40 - 11:10</SelectItem>
// //                       <SelectItem value="1120-1250">11:20 - 12:50</SelectItem>
// //                       <SelectItem value="1300-1430">13:00 - 14:30</SelectItem>
// //                       <SelectItem value="1440-1610">14:40 - 16:10</SelectItem>
// //                       <SelectItem value="1620-1750">16:20 - 17:50</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               ) : (
// //                 <div className="border rounded-lg p-4 bg-gray-50">
// //                   <div className="grid gap-2">
// //                     <div className="flex items-center gap-2">
// //                       <span className="font-medium">Subject :</span>
// //                       <span>Algorithm</span>
// //                       <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-500 text-white">
// //                         Cour
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="font-medium">Date :</span>
// //                       <span>Monday, 08:00 - 09:30</span>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="font-medium">section :</span>
// //                       <span>C</span>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="font-medium">Room :</span>
// //                       <span>415D</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             <div>
// //               <h2 className="text-lg font-semibold mb-4">
// //                 Reason for swap (optional)
// //               </h2>
// //               <Textarea
// //                 placeholder="Provide a reason for the swap request..."
// //                 className="min-h-24"
// //               />
// //             </div>

// //             <div className="flex justify-end gap-4">
// //               <Button variant="outline">Cancel</Button>
// //               {selectedDay && selectedTime ? (
// //                 <Button onClick={handleSelectSession}>Select Session</Button>
// //               ) : selectedSession ? (
// //                 <Button onClick={handleNextStep}>Next Step</Button>
// //               ) : (
// //                 <Button disabled>Next Step</Button>
// //               )}
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="space-y-8">
// //             <div>
// //               <h2 className="text-lg font-semibold mb-4">
// //                 Select a New Time Slot
// //               </h2>
// //               <Select defaultValue="monday-8">
// //                 <SelectTrigger className="w-full">
// //                   <SelectValue placeholder="Monday, 08:00 - 09:30  Room : 415D" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="monday-8">
// //                     Monday, 08:00 - 09:30 Room : 415D
// //                   </SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div>
// //               <h2 className="text-lg font-semibold mb-4">
// //                 Reason for swap (optional)
// //               </h2>
// //               <Textarea
// //                 placeholder="Provide a reason for the swap request..."
// //                 className="min-h-24"
// //               />
// //             </div>

// //             <div className="border rounded-lg overflow-hidden">
// //               <div className="grid grid-cols-2">
// //                 <div className="p-3 font-medium bg-blue-50 border-b">
// //                   Current Session
// //                 </div>
// //                 <div className="p-3 font-medium bg-blue-50 border-b">
// //                   Requested Change
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 border-b">
// //                 <div className="p-3">Subject: Algorithm (Cour)</div>
// //                 <div className="p-3">Subject: Algorithm (Cour)</div>
// //               </div>

// //               <div className="grid grid-cols-2 border-b">
// //                 <div className="p-3">Time: Mon 08:00-09:30</div>
// //                 <div className="p-3">New Time: Mon 09:30-11:00</div>
// //               </div>

// //               <div className="grid grid-cols-2">
// //                 <div className="p-3">Room: 415D</div>
// //                 <div className="p-3">New Room: 410B</div>
// //               </div>
// //             </div>

// //             <div className="flex justify-end gap-4">
// //               <Button variant="outline" onClick={() => setStep(1)}>
// //                 Cancel
// //               </Button>
// //               <Button>Submit Request</Button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// export default function CreateSwapRequestPage() {
//   const [step, setStep] = useState(1);
//   const [swapChoice, setSwapChoice] = useState<"both" | "time" | "room" | null>(
//     null
//   );
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");

//   const handleNextStep = () => {
//     if (swapChoice && selectedDay && selectedTime) {
//       setStep(2);
//     }
//   };

//   const handleSubmitRequest = () => {
//     // Submit request logic here
//     console.log("Request submitted");
//   };

//   return (
//     <div className="p-6 max-w-3xl">
//       {/* Header / Back Link */}
//       <div className="mb-8">
//         <Link
//           href="/swap-request"
//           className="flex items-center gap-2 text-[#000000] mb-4"
//         >
//           <ChevronLeft className="h-4 w-4 text-4xl" />
//           Swap Request Form
//         </Link>
//         <h1 className="text-2xl font-bold mb-1">Create Swap Request</h1>
//         <p className="text-gray-500">
//           Select a session and your desired swap options.
//         </p>
//       </div>

//       {/* Progress Indicator */}
//       <div className="flex items-center gap-4 mb-8">
//         <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
//           <span className="text-sm">1</span>
//         </div>
//         <div className="flex-1 h-1 bg-gray-200 rounded-full">
//           <div
//             className={`h-full bg-blue-600 rounded-full transition-all ${
//               step >= 2 ? "w-full" : "w-1/2"
//             }`}
//           ></div>
//         </div>
//         <div
//           className={`flex items-center justify-center w-8 h-8 rounded-full ${
//             step >= 2
//               ? "bg-blue-100 text-blue-600"
//               : "bg-gray-100 text-gray-400"
//           }`}
//         >
//           <span className="text-sm">2</span>
//         </div>
//       </div>

//       {/* Step 1: Choose Option & Select New Slot */}
//       {step === 1 && (
//         <div className="space-y-8">
//           <div className="grid grid-cols-2 gap-4">
//             <select className="px-4 py-2 rounded-md bg-white border">
//               <option value="sunday">Sunday</option>
//               <option value="monday">Monday</option>
//               <option value="tuesday">Tuesday</option>
//               <option value="Wednesday">Wednesday</option>
//               <option value="thursday">Thursday</option>
//               <option value="friday">Friday</option>
//               <option value="saturday">Saturday</option>
//             </select>
//             <select className="px-4 py-2 rounded-md bg-white border">
//               <option value="8-9">8:00 - 9:30</option>
//               <option value="8-9">9:40 - 11:10</option>
//               <option value="8-9">11:20 - 12:50</option>
//               <option value="8-9">13:00 - 14:30</option>
//               <option value="8-9">14:40 - 16:10</option>
//               <option value="8-9">16:20 - 17:50</option>
//             </select>
//             <select className="px-9 py-2 rounded-md bg-white border"></select>
//           </div>
//           <fieldset>
//             <legend className="text-sm font-medium text-[#09090B] mb-4">
//               Choose the Desired Swap Type
//             </legend>
//             <div className="pl-3">
//               <label className="flex item-center space-x-2">
//                 <input
//                   onChange={(e: any) => setSwapChoice(e.target.value)}
//                   type="radio"
//                   name="swapType"
//                   value="full"
//                 />
//                 <span>Swap Entire Session (Time & Room) </span>
//               </label>

//               <label className="flex item-center space-x-2">
//                 <input
//                   onChange={(e: any) => setSwapChoice(e.target.value)}
//                   type="radio"
//                   name="swapType"
//                   value="room"
//                 />
//                 <span>Change Room Only (Keep Same Time)</span>
//               </label>

//               <label className="flex item-center space-x-2">
//                 <input
//                   onChange={(e: any) => setSwapChoice(e.target.value)}
//                   type="radio"
//                   name="swapType"
//                   value="time"
//                 />
//                 <span>Change Time Only (Keep Same Room)</span>
//               </label>
//             </div>
//           </fieldset>
//           {swapChoice} / {selectedDay} / {selectedTime}
//           <div className="flex justify-center gap-4 ">
//             <button className="border rounded-md px-4 py-2">Cancel</button>
//             <button
//               className="bg-[#0334BC8F] px-4 py-2 rounded-sm text-white"
//               onClick={(e) => setStep(2)}
//               // disabled={!swapChoice || !selectedDay || !selectedTime}
//             >
//               Next Step
//             </button>
//           </div>
//           {/* Navigation Button */}
//         </div>
//       )}

//       {/* Step 2: Review & Submit */}
//       {step === 2 && (
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-lg font-semibold mb-4">
//               Review Your Swap Request
//             </h2>
//             <div className="border rounded-lg p-4 bg-gray-50">
//               {swapChoice === "both" && (
//                 <div className="grid gap-2">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Subject :</span>
//                     <span>Algorithm</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">New Time :</span>
//                     <span>
//                       {selectedDay}, {selectedTime}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">New Room :</span>
//                     <span>410B</span>
//                   </div>
//                 </div>
//               )}
//               {swapChoice === "time" && (
//                 <div className="grid gap-2">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Subject :</span>
//                     <span>Algorithm</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">New Time :</span>
//                     <span>
//                       {selectedDay}, {selectedTime}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Room :</span>
//                     <span>415D</span>
//                   </div>
//                 </div>
//               )}
//               {swapChoice === "room" && (
//                 <div className="grid gap-2">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Subject :</span>
//                     <span>Algorithm</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">Time :</span>
//                     <span>Mon 08:00 - 09:30</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium">New Room :</span>
//                     <span>410B</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-4">
//               Reason for Swap (optional)
//             </h2>
//             <Textarea
//               placeholder="Provide a reason for the swap request..."
//               className="min-h-24"
//             />
//           </div>
//           <div className="flex justify-end gap-4">
//             <Button variant="outline" onClick={() => setStep(1)}>
//               Cancel
//             </Button>
//             <Button onClick={handleSubmitRequest}>Submit Request</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
export default function CreateSwapRequestPage() {
  return (
    <div className="pl-6 pr-6 h-screen">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/swap-request"
          className="flex items-center gap-2 text-[#000000] mb-4"
        >
          <ChevronLeft className="h-4 w-4 font-bold text-4xl" />
          Swap Request Form
        </Link>
       <div className="pl-6 mt-4">
        <h1 className="text-2xl font-bold">Create Swap Request</h1>
        <p className="text-gray-500 mt-2">
          Select a session and your desired swap options.
        </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex place-items-center  gap-4 mb-8">
        <Indicator />
      </div>

      {/* Main Content (Firstpage) */}
      <div className="mt-8 w-[60%]">
        <Firstpage />
      </div>
    </div>
  );
}
