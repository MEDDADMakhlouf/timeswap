"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { GetSection } from "@/actions/checkursession";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FirstpageProps {
    phase: number;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setfromSession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
    swapType: string;
    setSwapType: React.Dispatch<React.SetStateAction<string>>;
    selectedDay: string;
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
    selectedTime: string;
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function Firstpage(props: FirstpageProps) {
    const {
        phase,
        setPhase,
        setfromSession,
        swapType,
        setSwapType,
        selectedDay,
        setSelectedDay,
        selectedTime,
        setSelectedTime,
    } = props;

    const [currentSession, setCurrentSession] = useState<SessionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch current session when selections change
    useEffect(() => {
        const fetchCurrentSession = async () => {
            if (!selectedDay || !selectedTime) return;

            setIsLoading(true);
            const [start_time, end_time] = selectedTime.split("-");

            const data: Omit<SwapRequest, "session_type"> = {
                start_time,
                end_time,
                week_day: selectedDay,
            };

            try {
                // Fetch the user's current session
                const sectionResult = await GetSection(data);
                setCurrentSession(sectionResult);
                setfromSession(sectionResult);

                if (!sectionResult) {
                    toast.error("No session found", {
                        description: "You don't have a session matching these criteria",
                    });
                }
            } catch (error) {
                toast.error("Error fetching session", {
                    description: "Failed to retrieve your session data",
                });
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentSession();
    }, [selectedDay, selectedTime, setfromSession]);

    const handleMoveForward = () => {
        if (!currentSession) {
            toast.error("No session found", {
                description: "Please select a day and time where you have a session",
            });
            return;
        }

        // Move to next step
        setPhase(phase + 1);
    };

    const handleCancel = () => {
        // Reset form
        setSelectedDay("");
        setSelectedTime("");
        setCurrentSession(null);
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

                {currentSession && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Your current session:</p>
                        {currentSession.module ? (
                            <p className="text-sm text-blue-700">
                                {currentSession.module} ({currentSession.session_type}) - Room{" "}
                                {currentSession.room?.room_id}
                            </p>
                        ) : (
                            <p className="text-sm text-blue-700">
                                No session found for the selected day and time
                            </p>
                        )}
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
                        <p className="text-sm text-gray-500">Checking your session...</p>
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleMoveForward} disabled={!currentSession || isLoading}>
                    Next Step
                </Button>
            </div>
        </div>
    );
}
