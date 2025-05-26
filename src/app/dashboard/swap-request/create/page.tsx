"use client";

import Firstpage from "@/components/features/swap-request/new/first-page";
import Secondpage from "@/components/features/swap-request/new/second-page";
import Thirdpage from "@/components/features/swap-request/new/third-page";
import { SessionResponse } from "@/types/swap";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateSwapRequestPage() {
    const [toSession, setToSession] = useState<SessionResponse | null>(null);
    const [fromSession, setFromSession] = useState<SessionResponse | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    // Form state
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [swapType, setSwapType] = useState("entireSession");
    const [swapReason, setSwapReason] = useState("");

    return (
        <div className="max-w-3xl px-4 py-6">
            {/* Title and description */}
            <Link href="/dashboard/swap-request" className="mb-8 flex items-center gap-2">
                <ChevronLeft className="size-8" strokeWidth={1.5} />
                <div>
                    <h1 className="text-xl font-bold">Create Swap Request</h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Select a session you want to swap and a teacher to swap with
                    </p>
                </div>
            </Link>

            {/* Steps indicator */}
            <div className="mb-8 flex items-center">
                <div className="flex items-center">
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep >= 1 ? "bg-blue-600 text-white" : "border border-gray-300"
                        }`}
                    >
                        {currentStep > 1 ? "✓" : "1"}
                    </div>
                    <span className="ml-2 text-sm font-medium">Step 1</span>
                </div>

                <div
                    className={`flex-grow h-0.5 mx-4 ${currentStep > 1 ? "bg-blue-600" : "bg-gray-200"}`}
                ></div>

                <div className="flex items-center">
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep >= 2 ? "bg-blue-600 text-white" : "border border-gray-300"
                        }`}
                    >
                        {currentStep > 2 ? "✓" : "2"}
                    </div>
                    <span className="ml-2 text-sm font-medium">Step 2</span>
                </div>

                <div
                    className={`flex-grow h-0.5 mx-4 ${currentStep > 2 ? "bg-blue-600" : "bg-gray-200"}`}
                ></div>

                <div className="flex items-center">
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            currentStep >= 3 ? "bg-blue-600 text-white" : "border border-gray-300"
                        }`}
                    >
                        {currentStep > 3 ? "✓" : "3"}
                    </div>
                    <span className="ml-2 text-sm font-medium">Step 3</span>
                </div>
            </div>

            {/* Form content */}
            {currentStep === 1 ? (
                <Firstpage
                    phase={currentStep}
                    setPhase={setCurrentStep}
                    setfromSession={setFromSession}
                    swapType={swapType}
                    setSwapType={setSwapType}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
            ) : currentStep === 2 ? (
                <Secondpage
                    phase={currentStep}
                    setPhase={setCurrentStep}
                    settosession={setToSession}
                    fromsession={fromSession}
                    swapType={swapType}
                    selectedDay={selectedDay}
                    selectedTime={selectedTime}
                    swapReason={swapReason}
                    setSwapReason={setSwapReason}
                />
            ) : currentStep === 3 ? (
                <Thirdpage
                    phase={currentStep}
                    setPhase={setCurrentStep}
                    fromsession={fromSession}
                    tosession={toSession}
                    swapReason={swapReason}
                    swapType={swapType}
                />
            ) : null}
        </div>
    );
}
