"use client";
import React, { useEffect, useState } from "react";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { Button } from "@/components/ui/button";
import { FetchSession } from "@/actions/fetchsession";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";

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
    const {
        phase,
        setPhase,
        fromsession,
        settosession,
        swapType,
        selectedDay,
        selectedTime,
        swapReason,
        setSwapReason,
    } = props;

    const [availableSessions, setAvailableSessions] = useState<SessionResponse[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // Filter states
    const [filteredSessions, setFilteredSessions] = useState<SessionResponse[]>([]);
    const [teacherFilter, setTeacherFilter] = useState("all");
    const [roomFilter, setRoomFilter] = useState("all");
    const [moduleFilter, setModuleFilter] = useState("all");

    // Fetch available sessions on component mount
    useEffect(() => {
        const fetchAvailableSessions = async () => {
            if (!selectedDay || !selectedTime) return;

            setIsLoading(true);
            const [start_time, end_time] = selectedTime.split("-");

            const data: SwapRequest = {
                session_type: "", // Get all sessions regardless of type
                start_time,
                end_time,
                week_day: selectedDay,
            };

            try {
                // Fetch available swap sessions
                const sessionsResult = await FetchSession(data);
                // Filter out user's own session if present
                let filteredSessions = fromsession
                    ? sessionsResult.filter((session) => session.id !== fromsession.id)
                    : sessionsResult;

                // Apply swap type restrictions
                if (fromsession && swapType) {
                    filteredSessions = filteredSessions.filter((session) => {
                        // If swapping room only, exclude sessions with the same room
                        if (swapType === "roomOnly" && session.room?.room_id === fromsession.room?.room_id) {
                            return false;
                        }

                        // If swapping time only, exclude sessions with the same time
                        if (
                            swapType === "timeOnly" &&
                            session.starting_time === fromsession.starting_time &&
                            session.ending_time === fromsession.ending_time
                        ) {
                            return false;
                        }

                        return true;
                    });
                }

                setAvailableSessions(filteredSessions);
                setFilteredSessions(filteredSessions);

                // Reset selection when available sessions change
                setSelectedSessionId("");
                resetFilters();

                if (filteredSessions.length === 0) {
                    toast.info("No available sessions", {
                        description: "No sessions found matching your criteria",
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
    }, [fromsession, selectedDay, selectedTime, swapType]);

    // Extract unique values for filters
    const getUniqueTeachers = () => {
        const teachers = availableSessions
            .map((session) => session.teacher?.username || "Unknown")
            .filter((value, index, self) => self.indexOf(value) === index);
        return teachers;
    };

    const getUniqueRooms = () => {
        const rooms = availableSessions
            .map((session) => session.room?.room_id || "Unknown")
            .filter((value, index, self) => self.indexOf(value) === index);
        return rooms;
    };

    const getUniqueModules = () => {
        const modules = availableSessions
            .map((session) => session.module)
            .filter((value, index, self) => self.indexOf(value) === index);
        return modules;
    };

    // Apply filters to sessions
    useEffect(() => {
        let result = [...availableSessions];

        // Apply teacher filter
        if (teacherFilter !== "all") {
            result = result.filter((session) => session.teacher?.username === teacherFilter);
        }

        // Apply room filter
        if (roomFilter !== "all") {
            result = result.filter((session) => session.room?.room_id === roomFilter);
        }

        // Apply module filter
        if (moduleFilter !== "all") {
            result = result.filter((session) => session.module === moduleFilter);
        }

        setFilteredSessions(result);
    }, [availableSessions, teacherFilter, roomFilter, moduleFilter]);

    const resetFilters = () => {
        setTeacherFilter("all");
        setRoomFilter("all");
        setModuleFilter("all");
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
            {/* Display current session info */}
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">Your Current Session</h3>
                <div className="mt-2 text-sm text-blue-700">
                    <p>
                        <strong>Module:</strong> {fromsession.module}
                    </p>
                    <p>
                        <strong>Day:</strong> {fromsession.week_day}
                    </p>
                    <p>
                        <strong>Time:</strong> {fromsession.starting_time} - {fromsession.ending_time}
                    </p>
                    <p>
                        <strong>Room:</strong> {fromsession.room?.room_id || "Unknown"}
                    </p>
                    <p>
                        <strong>Type:</strong> {fromsession.session_type}
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-medium mb-4">Select a Session to Swap With</h2>

                {/* Swap type information */}
                {swapType && fromsession && (
                    <div className="mb-4 p-3 border border-blue-200 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                            {swapType === "roomOnly" && (
                                <>
                                    <strong>Room Only Swap:</strong> Sessions in room{" "}
                                    {fromsession.room?.room_id} are excluded since you want to change rooms.
                                </>
                            )}
                            {swapType === "timeOnly" && (
                                <>
                                    <strong>Time Only Swap:</strong> Sessions at {fromsession.starting_time}-
                                    {fromsession.ending_time} are excluded since you want to change time.
                                </>
                            )}
                            {swapType === "entireSession" && (
                                <>
                                    <strong>Entire Session Swap:</strong> You can swap with any available
                                    session.
                                </>
                            )}
                        </p>
                    </div>
                )}

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50 mb-4">
                    <div>
                        <Label htmlFor="teacher-filter" className="block text-sm font-medium mb-1">
                            Teacher
                        </Label>
                        <Select value={teacherFilter} onValueChange={setTeacherFilter}>
                            <SelectTrigger id="teacher-filter" className="w-full">
                                <SelectValue placeholder="Filter by teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Teachers</SelectItem>
                                {getUniqueTeachers().map((teacher) => (
                                    <SelectItem key={teacher} value={teacher}>
                                        {teacher}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="room-filter" className="block text-sm font-medium mb-1">
                            Room
                        </Label>
                        <Select value={roomFilter} onValueChange={setRoomFilter}>
                            <SelectTrigger id="room-filter" className="w-full">
                                <SelectValue placeholder="Filter by room" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Rooms</SelectItem>
                                {getUniqueRooms().map((room) => (
                                    <SelectItem key={room} value={room}>
                                        {room}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="module-filter" className="block text-sm font-medium mb-1">
                            Module
                        </Label>
                        <Select value={moduleFilter} onValueChange={setModuleFilter}>
                            <SelectTrigger id="module-filter" className="w-full">
                                <SelectValue placeholder="Filter by module" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Modules</SelectItem>
                                {getUniqueModules().map((module) => (
                                    <SelectItem key={module} value={module}>
                                        {module}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="md:col-span-3 flex justify-end">
                        <Button variant="outline" size="sm" onClick={resetFilters}>
                            Reset Filters
                        </Button>
                    </div>
                </div>

                {/* Session selection */}
                {isLoading ? (
                    <div className="flex justify-center py-4">
                        <div className="animate-pulse text-center">
                            <p className="text-sm text-gray-500">Loading available sessions...</p>
                        </div>
                    </div>
                ) : filteredSessions.length > 0 ? (
                    <div>
                        <p className="text-sm text-gray-500 mb-2">
                            {filteredSessions.length} {filteredSessions.length === 1 ? "session" : "sessions"}{" "}
                            available
                        </p>
                        <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a session" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredSessions.map((session) => (
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
                            {availableSessions.length > 0
                                ? "No sessions match your current filters. Try adjusting or resetting your filters."
                                : "No available sessions found. Try selecting a different day, time, or swap type."}
                        </p>
                        {availableSessions.length > 0 && (
                            <Button variant="outline" size="sm" onClick={resetFilters} className="mt-2">
                                Reset Filters
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {selectedSessionId && (
                <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                    {availableSessions
                        .filter((session) => session.id === parseInt(selectedSessionId))
                        .map((session) => (
                            <div key={session.id} className="text-sm text-green-700">
                                <h3 className="font-medium text-green-800 mb-2">Selected Session Details</h3>
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
            )}

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
                    Back
                </Button>
                <Button onClick={handleMoveForward} disabled={!selectedSessionId}>
                    Next Step
                </Button>
            </div>
        </div>
    );
}
