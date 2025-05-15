"use client";

import { useEffect, useState } from "react";
import { Fetchschedule } from "@/actions/fetchtable";
import { Ursession } from "@/types/table";


const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const timeSlots = [
  "08:00 - 09:30",
  "09:40 - 11:10",
  "11:20 - 12:50",
  "13:00 - 14:30",
  "14:40 - 16:10",
  "16:20 - 17:50",
];


const timeSlotMatches = (start: string, end: string, slot: string): boolean => {
  const [slotStart, slotEnd] = slot.split(" - ");
  return start === slotStart && end === slotEnd;
};

export function Timetable() {
  const [sessions, setSessions] = useState<Ursession[]>([]);
  const [bgCol, setbgCol] = useState("bg-gray-100");

  useEffect(() => {
    Fetchschedule().then((data: Ursession[]) => {
      setSessions(data);
    });
  }, []);

  const getClass = (day: string, time: string) => {
    return sessions.find(
      (session) =>
        session.week_day === day &&
        timeSlotMatches(session.starting_time, session.ending_time, time)
    );
  };

  const ClassBadge = ({ type }: { type: string }) => {
    if (!type) return null;

    const bgColorClass =
      type === "Lesson"
        ? "bg-blue-500"
        : type === "TD"
        ? "bg-green-500"
        : type === "TP"
        ? "bg-orange-500"
        : "bg-red-500";
        
        
        

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${bgColorClass}  text-white`}>
        {type}
      </span>
    );
  };

  const ClassCell = ({ classData }: { classData?: Ursession }) => {
    if (!classData) {
      return (
        <div className="text-xs text-gray-400 h-full flex items-center justify-center">
          Available
        </div>
      );
    }
    const bgColorClass =
      classData.session_type === "Lesson"
        ? "bg-blue-100"
        : classData.session_type === "TD"
        ? "bg-green-100"
        : classData.session_type === "TP"
        ? "bg-orange-100"
        : "bg-red-100";

    return (
      <div className={`p-2 ${ bgColorClass} rounded-md h-full flex flex-col hover:opacity-80 translate-x-1 transition-transform`}>
        <div className="font-medium text-sm">{classData.module}</div>
        {classData.room && (
          <div className="text-xs text-gray-600">Room {classData.room}</div>
        )}
        {classData.session_type && (
          <div className="mt-auto">
            <ClassBadge type={classData.session_type} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My TimeTable</h2>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 border-b">
          <div className="p-3 font-medium border-r bg-gray-100">Day / Time</div>
          {timeSlots.map((time) => (
            <div key={time} className="p-3 font-medium text-center text-xs border-r ">
              {time}
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day} className="grid grid-cols-7 border-b last:border-b-0">
            <div className="p-3 font-medium border-r bg-gray-50">{day}</div>
            {timeSlots.map((time) => {
              const classData = getClass(day, time);
              return (
                <div key={`${day}-${time}`} className="p-2 min-h-24 border-r">
                  <ClassCell classData={classData} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
