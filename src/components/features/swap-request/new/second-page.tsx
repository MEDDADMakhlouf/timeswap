"use client";
import React, { useEffect, useState } from "react";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { Button } from "@/components/ui/button";
import { FetchSession } from "@/actions/fetchsession";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SecondpageProps {
    phase: number;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    settosession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
    fromsession: SessionResponse | null;
    swapType: string;
    selectedDay: string;
    selectedTime: string;
    swapReason: string;
    setSwapReason: React.Dispatch<React.SetStateAction<string>>;
}

export default function SecondPage(props: SecondpageProps) {
    const { phase, setPhase, fromsession, settosession, swapType, swapReason, setSwapReason } = props;

    const [availableSessions, setAvailableSessions] = useState<SessionResponse[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // Filter states
    const [selectedTargetTime, setSelectedTargetTime] = useState("");
    const [selectedTargetDay, setSelectedTargetDay] = useState("");

    // Add state for selected room type (session type)
    const [selectedRoomType, setSelectedRoomType] = useState(fromsession?.session_type || "TD");

    // Update selectedRoomType if fromsession changes
    useEffect(() => {
        if (fromsession?.session_type) {
            setSelectedRoomType(fromsession.session_type);
        }
    }, [fromsession]);
    // Auto-select values based on swap type
    useEffect(() => {
        if (!fromsession) return;

        if (swapType === "roomOnly") {
            // For room-only swaps: auto-select current day and time
            setSelectedTargetDay(fromsession.week_day);
            setSelectedTargetTime(`${fromsession.starting_time}-${fromsession.ending_time}`);
            // Reset room selection to force user to choose a different room
        } else if (swapType === "timeOnly") {
            // Reset day and time selection to allow user to choose different time/day
            setSelectedTargetDay("");
            setSelectedTargetTime("");
        } else {
            // For entire session swaps: reset all selections
            setSelectedTargetDay("");
            setSelectedTargetTime("");
        }
    }, [swapType, fromsession]);

    // Fetch available sessions when room, time, and day are selected
    useEffect(() => {
        const fetchAvailableSessions = async () => {
            if ( !selectedTargetTime || !selectedTargetDay) {
                setAvailableSessions([]);
                setSelectedSessionId("");
                return;
            }

            setIsLoading(true);
            const [start_time, end_time] = selectedTargetTime.split("-");

            const data: SwapRequest = {
                start_time,
                end_time,
                week_day: selectedTargetDay,
                session_type: fromsession?.session_type || "TD",
            };

            try {
                // Fetch available swap sessions
                const sessionsResult = await FetchSession(data);

                setAvailableSessions(sessionsResult);

                // Reset selection when available sessions change
                setSelectedSessionId("");

                if (availableSessions.length === 0) {
                    toast.info("No available sessions", {
                        description: "No sessions found for the selected criteria",
                    });
                }
            } catch (error) {
                toast.error("Error fetching sessions", {
                    description: "Failed to retrieve available sessions",
                });
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailableSessions();
    }, [fromsession, selectedTargetTime, selectedTargetDay, swapType]);


    const getAvailableTimes = () => {
        const times = [
            "08:00-09:30",
            "09:40-11:10",
            "11:20-12:50",
            "13:00-14:30",
            "14:40-16:10",
            "16:20-17:50",
        ];

        if (fromsession && swapType === "timeOnly") {
            // For time-only swaps, exclude the current time
            const currentTime = `${fromsession.starting_time}-${fromsession.ending_time}`;
            return times.filter((time) => time !== currentTime);
        } else if (fromsession && swapType === "roomOnly") {
            // For room-only swaps, only show the current time
            return [`${fromsession.starting_time}-${fromsession.ending_time}`];
        } else {
            // For entire session swaps, show all times
            return times;
        }
    };

    const getAvailableDays = () => {
        const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

        if (fromsession && swapType === "roomOnly") {
            // For room-only swaps, only show the current day
            return [fromsession.week_day];
        } else {
            // For time-only and entire session swaps, show all days
            return days;
        }
    };

    const handleBack = () => {
        setPhase(phase - 1);
    };

    const handleMoveForward = () => {
        if (!selectedSessionId) {
            toast.error("No target session selected", {
                description: "Please select a session to swap with",
            });
            return;
        }

        const selectedSession = availableSessions.find(
            (session) => session.id === parseInt(selectedSessionId),
        );
        if (!selectedSession) {
            toast.error("Selected session not found", {
                description: "The selected target session could not be found",
            });
            return;
        }

        // Store the target session
        settosession(selectedSession);

        // Move to next step (summary page)
        setPhase(phase + 1);
    };

    // Format session for display in select
    const formatSessionOption = (session: SessionResponse) => {
        return `${session.module} - Room ${session.room?.room_id || "Unknown"} - ${session.starting_time}-${
            session.ending_time
        }`;
    };

    // Show a warning if no source session is available
    if (!fromsession) {
        return (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                <p className="text-yellow-800">
                    Original session information is missing. Please go back to step 1.
                </p>
                <Button variant="outline" onClick={handleBack} className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Swap type information */}
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">
                    Swap Type:{" "}
                    {swapType === "roomOnly"
                        ? "Room Only"
                        : swapType === "timeOnly"
                        ? "Time Only"
                        : "Entire Session"}
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                    {swapType === "roomOnly" && (
                        <p>
                            You are swapping to a different room while keeping the same day and time (
                            {fromsession.week_day}, {fromsession.starting_time}-{fromsession.ending_time}).
                        </p>
                    )}
                    {swapType === "timeOnly" && (
                        <p>
                            You are swapping to a different time and/or day while keeping the same room (Room{" "}
                            {fromsession.room?.room_id}).
                        </p>
                    )}
                    {swapType !== "roomOnly" && swapType !== "timeOnly" && (
                        <p>
                            You are swapping your entire session for a completely different session (different
                            day, time, and/or room).
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-medium mb-4">
                        Select a New Time Slot
                        {swapType === "roomOnly" && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                (Fixed to current time for room-only swap)
                            </span>
                        )}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Select
                                value={selectedTargetDay}
                                onValueChange={setSelectedTargetDay}
                                disabled={swapType === "roomOnly"}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a day" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getAvailableDays().map((day) => (
                                        <SelectItem key={day} value={day}>
                                            {day.charAt(0) + day.slice(1).toLowerCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Select
                                value={selectedTargetTime}
                                onValueChange={setSelectedTargetTime}
                                disabled={swapType === "roomOnly"}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getAvailableTimes().map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-4">
                        Select a New Room
                        {swapType === "timeOnly" && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                (Fixed to current room for time-only swap)
                            </span>
                        )}
                    </h2>
                    {/* Session type filter dropdown */}
                    <div className="mb-4">
                        <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select session type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TD">TD</SelectItem>
                                <SelectItem value="Lesson">Lesson</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Select all available sessions of the selected type */}
                    <div className="mb-4">
                        <Select
                            value={selectedSessionId}
                            onValueChange={setSelectedSessionId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a session" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSessions
                                    .filter(session => session.session_type?.toLowerCase() === selectedRoomType?.toLowerCase())
                                    .map(session => (
                                        <SelectItem key={session.id} value={session.id.toString()}>
                                            {formatSessionOption(session)}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Available Sessions Selection */}
                {selectedTargetDay && selectedTargetTime && (
                    <div>
                        <h2 className="text-lg font-medium mb-4">Select Available Session</h2>
                        {isLoading ? (
                            <div className="flex justify-center py-4">
                                <div className="animate-pulse text-center">
                                    <p className="text-sm text-gray-500">Loading available sessions...</p>
                                </div>
                            </div>
                        ) : availableSessions.length > 0 ? (
                            <div>
                                <p className="text-sm mb-2">
                                    {availableSessions.length}{" "}
                                    {availableSessions.length === 1 ? "session" : "sessions"} available
                                </p>
                                <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a session" />
                                    </SelectTrigger>
                                    <SelectContent>
                                            {availableSessions.map((session) => (
                                            <SelectItem key={session.id} value={session.id.toString()}>
                                                {formatSessionOption(session)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
                                <p className="text-amber-800">
                                    No available sessions found for the selected day, room, and time.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Selected Session Details */}
                {/* {selectedSessionId && (
                    <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                        {availableSessions
                            .filter((session) => session.id === parseInt(selectedSessionId))
                            .map((session) => (
                                <div key={session.id} className="text-sm text-green-700">
                                    <h3 className="font-medium text-green-800 mb-2">
                                        Selected Session Details
                                    </h3>
                                    <p>
                                        <strong>Module:</strong> {session.module}
                                    </p>
                                    <p>
                                        <strong>Teacher:</strong> {session.teacher?.username || "Unknown"}
                                    </p>
                                    <p>
                                        <strong>Day:</strong> {session.week_day}
                                    </p>
                                    <p>
                                        <strong>Time:</strong> {session.starting_time} - {session.ending_time}
                                    </p>
                                    <p>
                                        <strong>Room:</strong> {session.room?.room_id || "Unknown"}
                                    </p>
                                </div>
                            ))}
                    </div>
                )} */}
            </div>

            <div>
                <h2 className="text-lg font-medium mb-4">Reason for swap (optional)</h2>
                <Textarea
                    placeholder="Provide a reason for the swap request..."
                    className="min-h-[100px]"
                    value={swapReason}
                    onChange={(e) => setSwapReason(e.target.value)}
                />
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                    Cancel
                </Button>
                <Button onClick={handleMoveForward} disabled={!selectedSessionId}>
                    Next Step
                </Button>
            </div>
        </div>
    );
}
