"use client";

import Firstpage from "@/components/firstpage";
import { Indicator } from "@/components/indicator";
import Secondpage from "@/components/secondpage";
import { NewSwapRequest } from "@/types/session";
import { SessionResponse } from "@/types/swap";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateSwapRequestPage() {
    // const newswaprequest:NewSwapRequest|null=  null;
    const [toSession, settoSession] = useState<SessionResponse | null>(null);
    const [fromSession, setfromSession] = useState<SessionResponse | null>(null);

    const Phases: number[] = [1, 2, 3];
    const [phase, setphase] = useState(Phases[0]);
    return (
        <div className="pl-6 pr-6 h-screen">
            {/* Header */}
            <div className="mb-8">
                <Link href="/swap-request" className="flex items-center gap-2 text-[#000000] mb-4">
                    <ChevronLeft className="h-4 w-4 font-bold text-4xl" />
                    Swap Request Form
                </Link>
                <div className="pl-6 mt-4">
                    <h1 className="text-2xl font-bold">Create Swap Request</h1>
                    <p className="text-gray-500 mt-2">Select a session and your desired swap options.</p>
                </div>
            </div>

            <div className="flex place-items-center  gap-4 mb-8">
                <Indicator phase={phase} />
            </div>

            <div className="mt-8 w-[60%]">
                {phase === 1 ? (
                    <Firstpage
                        phase={phase}
                        setPhase={setphase}
                        setfromsession={setfromSession}
                        settosession={settoSession}
                    />
                ) : phase === 2 ? (
                    <Secondpage
                        phase={phase}
                        setPhase={setphase}
                        setfromsession={setfromSession}
                        settosession={settoSession}
                        fromsession={fromSession}
                        tosession={toSession}
                    />
                ) : null}
            </div>
        </div>
    );
}
