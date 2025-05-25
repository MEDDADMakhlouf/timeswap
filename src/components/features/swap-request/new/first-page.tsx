"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { FetchSession } from "@/actions/fetchsession";
import { GetSection } from "@/actions/checkursession";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FirstpageProps {
    phase: number;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    settosession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
    setfromsession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
}

export default function Firstpage(props: FirstpageProps) {
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [swapType, setSwapType] = useState("entireSession");
    const [sessions, setSessions] = useState<SessionResponse[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    const [selectedSession, setSelectedSession] = useState<SessionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get session type based on swap type selection
    const getSessionType = (): string => {
        switch (swapType) {
            case "entireSession":
                return "Lesson";
            case "roomOnly":
                return "TD";
            case "timeOnly":
                return "TP";
            default:
                return "Lesson";
        }
    };

    // Fetch data whenever selections change
    useEffect(() => {
        const fetchData = async () => {
            if (!selectedDay || !selectedTime) return;

            setIsLoading(true);
            const [start_time, end_time] = selectedTime.split("-");
            const sessionType = getSessionType();

            const data: SwapRequest = {
                session_type: sessionType,
                start_time,
                end_time,
                week_day: selectedDay,
            };

            try {
                // Fetch the user's current session (from session)
                const sectionResult = await GetSection(data);
                setSelectedSession(sectionResult);

                // Fetch available swap sessions
                const sessionsResult = await FetchSession(data);
                setSessions(sessionsResult);

                // Reset selected session ID when fetch criteria change
                setSelectedSessionId(null);

                if (sessionsResult.length === 0) {
                    toast.info("No available sessions", {
                        description: "No sessions found matching your criteria",
                    });
                }
            } catch (error) {
                toast.error("Error fetching sessions", {
                    description: "Failed to retrieve session data",
                });
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedDay, selectedTime, swapType]);

    const handleMoveForward = (id: number) => {
        if (!selectedSession) {
            toast.error("Original session not found", {
                description: "Your current session information could not be retrieved",
            });
            return;
        }

        const session = sessions.find((s) => s.id === id) || null;
        if (!session) {
            toast.error("Target session not found", {
                description: "The selected session could not be found",
            });
            return;
        }

        // Store both the original and target sessions
        props.setfromsession(selectedSession);
        props.settosession(session);

        // Log to verify data is passed correctly
        console.log("From session:", selectedSession);
        console.log("To session:", session);

        // Move to next step
        props.setPhase(props.phase + 1);
    };

    const handleCancel = () => {
        setSelectedDay("");
        setSelectedTime("");
        setSessions([]);
        setSelectedSessionId(null);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-lg font-medium mb-4">Select the Session You Want to Modify</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Select value={selectedDay} onValueChange={setSelectedDay}>
                            <SelectTrigger id="day" className="w-full">
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SUNDAY">Sunday</SelectItem>
                                <SelectItem value="MONDAY">Monday</SelectItem>
                                <SelectItem value="TUESDAY">Tuesday</SelectItem>
                                <SelectItem value="WEDNESDAY">Wednesday</SelectItem>
                                <SelectItem value="THURSDAY">Thursday</SelectItem>
                                <SelectItem value="FRIDAY">Friday</SelectItem>
                                <SelectItem value="SATURDAY">Saturday</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger id="time" className="w-full">
                                <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="08:00-09:30">8:00 - 9:30</SelectItem>
                                <SelectItem value="09:40-11:10">9:40 - 11:10</SelectItem>
                                <SelectItem value="11:20-12:50">11:20 - 12:50</SelectItem>
                                <SelectItem value="13:00-14:30">13:00 - 14:30</SelectItem>
                                <SelectItem value="14:40-16:10">14:40 - 16:10</SelectItem>
                                <SelectItem value="16:20-17:50">16:20 - 17:50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {selectedSession && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Your current session:</p>
                        <p className="text-sm text-blue-700">
                            {selectedSession.module} ({selectedSession.session_type}) - Room{" "}
                            {selectedSession.room?.room_id}
                        </p>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-lg font-medium mb-4">Choose the Desired Swap Type</h2>
                <RadioGroup value={swapType} onValueChange={setSwapType} className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="entireSession" id="entireSession" />
                        <Label htmlFor="entireSession">Swap Entire Session (Time & Room)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="roomOnly" id="roomOnly" />
                        <Label htmlFor="roomOnly">Change Room Only (Keep Same Time)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="timeOnly" id="timeOnly" />
                        <Label htmlFor="timeOnly">Change Time Only (Keep Same Room)</Label>
                    </div>
                </RadioGroup>
            </div>

            {isLoading && (
                <div className="flex justify-center py-4">
                    <div className="animate-pulse text-center">
                        <p className="text-sm text-gray-500">Loading sessions...</p>
                    </div>
                </div>
            )}

            {!isLoading && sessions.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Available Sessions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => setSelectedSessionId(session.id)}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                    selectedSessionId === session.id
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <h3 className="font-medium">{session.module}</h3>
                                <div className="mt-2 text-sm text-gray-600 space-y-1">
                                    <p>Teacher: {session.teacher?.username || "Unknown"}</p>
                                    <p>Room: {session.room?.room_id || "Unknown"}</p>
                                    <p>
                                        Time: {session.starting_time} - {session.ending_time}
                                    </p>
                                    <p>Day: {session.week_day}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                {selectedSessionId ? (
                    <Button onClick={() => handleMoveForward(selectedSessionId)} disabled={!selectedSession}>
                        Next Step
                    </Button>
                ) : (
                    <Button disabled={true}>Select a Session</Button>
                )}
            </div>
        </div>
    );
}
