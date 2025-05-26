"use client";
import React, { useState } from "react";
import { SessionResponse } from "@/types/swap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";
import { CreateSwapRequest } from "@/actions/createswaprequest";
import { NewswapRequest } from "@/types/session";
import { useRouter } from "next/navigation";

interface ThirdPageProps {
    phase: number;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    fromsession: SessionResponse | null;
    tosession: SessionResponse | null;
    swapReason: string;
    swapType: string;
}

export default function ThirdPage(props: ThirdPageProps) {
    const { phase, setPhase, fromsession, tosession, swapReason, swapType } = props;
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBack = () => {
        setPhase(phase - 1);
    };

    const handleSubmit = () => {
        if (!fromsession?.id || !tosession?.id) {
            toast.error("Missing session information", {
                description: "Both original and target session information are required",
            });
            return;
        }

        setIsSubmitting(true);

        const newswaprequest: NewswapRequest = {
            from_session: fromsession.id,
            to_session: tosession.id,
            swap_type: swapType,
            reason: swapReason || undefined,
        };

        toast.promise(CreateSwapRequest(newswaprequest), {
            loading: "Submitting swap request...",
            success: () => {
                setTimeout(() => {
                    router.push("/dashboard/swap-request");
                }, 2000);
                return "Swap request submitted successfully!";
            },
            error: () => {
                setIsSubmitting(false);
                return "Failed to create swap request";
            },
        });
    };

    const renderSessionCard = (session: SessionResponse | null, title: string) => {
        if (!session) {
            return (
                <Card className="h-full">
                    <CardContent className="py-6">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <AlertCircle className="h-5 w-5" />
                            <p className="text-center">No session information available</p>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="h-full">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>
                        {session.module} ({session.session_type})
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="text-sm">
                        <strong>Teacher:</strong> {session.teacher?.username || "Unknown"}
                    </div>
                    <div className="text-sm">
                        <strong>Day:</strong> {session.week_day}
                    </div>
                    <div className="text-sm">
                        <strong>Time:</strong> {session.starting_time} - {session.ending_time}
                    </div>
                    <div className="text-sm">
                        <strong>Room:</strong> {session.room?.room_id || "Unknown"}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Review Swap Request</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderSessionCard(fromsession, "Current Session")}
                {renderSessionCard(tosession, "Requested Change")}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-medium mb-2 text-blue-800">Swap Type</h3>
                <p className="text-sm text-blue-700">
                    {swapType === "entireSession" && "Swap Entire Session (Time & Room)"}
                    {swapType === "roomOnly" && "Change Room Only (Keep Same Time)"}
                    {swapType === "timeOnly" && "Change Time Only (Keep Same Room)"}
                </p>
            </div>

            {swapReason && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <h3 className="font-medium mb-2">Reason for swap</h3>
                    <p className="text-sm text-gray-700">{swapReason}</p>
                </div>
            )}

            <table className="w-full border-collapse mt-6">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-3 text-left text-sm font-medium text-gray-500">Current Session</th>
                        <th className="p-3 text-left text-sm font-medium text-gray-500">Requested Change</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr>
                        <td className="p-3 text-sm">
                            <strong>Subject:</strong> {fromsession?.module || "N/A"}
                        </td>
                        <td className="p-3 text-sm">
                            <strong>Subject:</strong> {tosession?.module || "N/A"}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 text-sm">
                            <strong>Time:</strong>{" "}
                            {fromsession
                                ? `${fromsession.week_day}, ${fromsession.starting_time}-${fromsession.ending_time}`
                                : "N/A"}
                        </td>
                        <td className="p-3 text-sm">
                            <strong>New Time:</strong>{" "}
                            {tosession
                                ? `${tosession.week_day}, ${tosession.starting_time}-${tosession.ending_time}`
                                : "N/A"}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 text-sm">
                            <strong>Room:</strong> {fromsession?.room?.room_id || "N/A"}
                        </td>
                        <td className="p-3 text-sm">
                            <strong>New Room:</strong> {tosession?.room?.room_id || "N/A"}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
                    Back
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !fromsession || !tosession}
                    className="bg-primary text-white"
                >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
            </div>
        </div>
    );
}
