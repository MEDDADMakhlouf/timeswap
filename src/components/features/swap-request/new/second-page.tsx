"use client";
import React, { useEffect, useState } from "react";
import { SessionResponse } from "@/types/swap";
import { Button } from "@/components/ui/button";
import { CreateSwapRequest } from "@/actions/createswaprequest";
import { NewswapRequest, NewSwapRequest } from "@/types/session";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Clock, MapPin, Pencil, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SecondpageProps {
    phase: number;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    settosession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
    setfromsession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
    fromsession: SessionResponse | null;
    tosession: SessionResponse | null;
}

export default function SecondPage(props: SecondpageProps) {
    const router = useRouter();
    const { phase, setPhase, fromsession, tosession } = props;

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [swapReason, setSwapReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form values from the original session when available
    useEffect(() => {
        if (fromsession) {
            console.log("Original session loaded:", fromsession);
            setSelectedDay(fromsession.week_day || "");
            setSelectedTime(`${fromsession.starting_time}-${fromsession.ending_time}` || "");
            if (fromsession.room && fromsession.room.room_id) {
                setSelectedRoom(fromsession.room.room_id);
            }
        }
    }, [fromsession]);

    const handleBack = () => {
        setPhase(phase - 1);
    };

    const handleConfirm = () => {
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
            // In a real implementation, you might include the new selections and reason
            // reason: swapReason
        };

        toast.promise(CreateSwapRequest(newswaprequest), {
            loading: "Creating swap request...",
            success: () => {
                setPhase(phase + 1);
                setTimeout(() => {
                    router.push("/dashboard/swap-request");
                }, 1000);
                return "Swap request created successfully!";
            },
            error: () => {
                setIsSubmitting(false);
                return "Failed to create swap request";
            },
        });
    };

    const renderSessionCard = (session: SessionResponse | null, type: "From" | "To") => {
        if (!session) {
            return (
                <Card className="h-full flex items-center justify-center">
                    <CardContent className="py-6">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <AlertCircle className="h-5 w-5" />
                            <p className="text-center">No {type.toLowerCase()} session selected</p>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="h-full">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-lg">{session.module}</CardTitle>
                            <CardDescription>
                                {type} Session • {session.session_type}
                            </CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">
                            {type}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {session.teacher?.email || session.teacher?.username || "Unknown teacher"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Room {session.room?.room_id || "Unknown"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {session.week_day}, {session.starting_time} - {session.ending_time}
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Show a warning toast if sessions are missing
    useEffect(() => {
        if (!fromsession || !tosession) {
            toast.warning("Incomplete selection", {
                description: "Please go back and select both sessions to complete your swap request.",
                duration: 5000,
            });
        }
    }, [fromsession, tosession]);

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
            <div>
                <h2 className="text-lg font-medium mb-4">Select a New Time Slot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Select value={selectedDay} onValueChange={setSelectedDay}>
                            <SelectTrigger className="w-full">
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
                            <SelectTrigger className="w-full">
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
            </div>

            <div>
                <h2 className="text-lg font-medium mb-4">Select a New Room</h2>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Room" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="A1">A1</SelectItem>
                        <SelectItem value="A2">A2</SelectItem>
                        <SelectItem value="B1">B1</SelectItem>
                        <SelectItem value="B2">B2</SelectItem>
                        <SelectItem value="C1">C1</SelectItem>
                    </SelectContent>
                </Select>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Display current session info */}
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-blue-800">Current Session</h3>
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
                {/* Target session info (if available) */}
                {tosession && (
                    <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                        <h3 className="font-medium text-green-800">Target Session</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>
                                <strong>Module:</strong> {tosession.module}
                            </p>
                            <p>
                                <strong>Teacher:</strong> {tosession.teacher?.username || "Unknown"}
                            </p>
                            <p>
                                <strong>Day:</strong> {tosession.week_day}
                            </p>
                            <p>
                                <strong>Time:</strong> {tosession.starting_time} - {tosession.ending_time}
                            </p>
                            <p>
                                <strong>Room:</strong> {tosession.room?.room_id || "Unknown"}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleBack}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Next Step"}
                </Button>
            </div>
        </div>
    );
}
