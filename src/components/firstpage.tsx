"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { FetchSession } from "@/actions/fetchsession";
import { Session } from "@/types/session";
import { GetSection } from "@/actions/checkursession";

interface FirstpageProps {
    phase: number;
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    settosession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
    setfromsession: React.Dispatch<React.SetStateAction<SessionResponse | null>>;
}

export default function Firstpage(props: FirstpageProps) {
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [sessions, setSessions] = useState<SessionResponse[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    const [selectedSession, setSelectedSession] = useState<SessionResponse | null>(null);
    const [pressed, setPressed] = useState(true);

    const handleMoveForward = (id: number) => {
        const session = sessions.find((s) => s.id === id) || null;
        props.settosession(session);
        props.setfromsession(selectedSession);
        props.setPhase(props.phase + 1);

        console.log("fromsession", selectedSession);
        console.log("tosession", session);
    };

    const handleNextStep = () => {
        if (!selectedDay || !selectedTime || !selectedType) {
            alert("Please select all fields");
            return;
        }

        const [start_time, end_time] = selectedTime.split("-");
        const data: SwapRequest = {
            session_type: selectedType,
            start_time,
            end_time,
            week_day: selectedDay,
        };

        FetchSession(data)
            .then((response) => {
                setSessions(response);
                console.log("Fetched sessions:", response);
            })
            .catch((error) => console.error("FetchSession error:", error));

        GetSection(data)
            .then((response) => {
                console.log("GetSection response:", response);

                const session = response;

                console.log("Selected session hdi mchi lazam tkon null:", session);
                setSelectedSession(session);
            })
            .catch((error) => console.error("GetSection error:", error));

        setPressed(false);
    };

    const handleCancel = () => {
        setSelectedDay("");
        setSelectedTime("");
        setSelectedType("");
        setSessions([]);
        setSelectedSessionId(null);
        setPressed(true);
    };

    useEffect(() => {
        if (selectedSession) {
            console.log("Updated selectedSession:", selectedSession);
        }
    }, [selectedSession]);

    return (
        <div className="flex flex-col min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Choose Your Session</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <select
                    className="px-4 py-2 min-w-[150px] rounded-md bg-white border text-lg"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                >
                    <option value="">Select Day</option>
                    <option value="SUNDAY">Sunday</option>
                    <option value="MONDAY">Monday</option>
                    <option value="TUESDAY">Tuesday</option>
                    <option value="WEDNESDAY">Wednesday</option>
                    <option value="THURSDAY">Thursday</option>
                    <option value="FRIDAY">Friday</option>
                    <option value="SATURDAY">Saturday</option>
                </select>

                <select
                    className="px-4 py-2 min-w-[150px] rounded-md bg-white border text-lg"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">Select Time</option>
                    <option value="08:00-09:30">8:00 - 9:30</option>
                    <option value="09:40-11:10">9:40 - 11:10</option>
                    <option value="11:20-12:50">11:20 - 12:50</option>
                    <option value="13:00-14:30">13:00 - 14:30</option>
                    <option value="14:40-16:10">14:40 - 16:10</option>
                    <option value="16:20-17:50">16:20 - 17:50</option>
                </select>
            </div>

            <select
                className="px-4 py-2 min-w-[300px] rounded-md bg-white border text-lg mb-6"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">Select Session Type</option>
                <option value="Lesson">Course</option>
                <option value="TD">TD</option>
                <option value="TP">TP</option>
            </select>

            {pressed ? (
                <div className="flex gap-4 mt-4 justify-end">
                    <Button
                        onClick={handleNextStep}
                        style={{ backgroundColor: "#0334BC" }}
                        className="px-6 py-2 text-white font-bold rounded-md hover:bg-blue-700"
                    >
                        Next Step
                    </Button>

                    <Button
                        onClick={handleCancel}
                        variant="ghost"
                        className="px-6 py-2 text-black border-[1px] font-bold rounded-md"
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <div>heyy</div>
            )}

            {sessions.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => setSelectedSessionId(session.id)}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                selectedSessionId === session.id
                                    ? "border-blue-600 shadow-lg"
                                    : "border-gray-300"
                            }`}
                        >
                            <h2 className="text-xl font-bold">{session.module}</h2>
                            <p>Teacher: {session.teacher.username}</p>
                            <p>Room: {session.room.room_id}</p>
                            <p>
                                Time: {session.starting_time} - {session.ending_time}
                            </p>
                            <p>Type: {session.session_type}</p>
                            <p>Day: {session.week_day}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedSessionId && (
                <div className="mt-4">
                    <Button
                        onClick={() => handleMoveForward(selectedSessionId)}
                        style={{ backgroundColor: "#0334BC" }}
                        className="px-6 py-2 text-white font-bold rounded-md hover:bg-blue-700"
                    >
                        Move Forward
                    </Button>
                </div>
            )}
        </div>
    );
}
