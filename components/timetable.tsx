"use client";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "08:00 - 09:30",
  "09:45 - 11:15",
  "11:30 - 13:00",
  "13:30 - 15:00",
  "15:15 - 16:45",
];
const scheduleData = [
  {
    day: "Monday",
    time: "08:00 - 09:30",
    course: "Computer Science 101",
    room: "Room A-101",
    type: "Lecture",
    color: "bg-blue-100",
  },
  {
    day: "Tuesday",
    time: "09:45 - 11:15",
    course: "Algorithms",
    room: "Room C-303",
    type: "TD",
    color: "bg-green-100",
  },
  {
    day: "Thursday",
    time: "11:30 - 13:00",
    course: "Programming Languages",
    room: "Room A-201",
    type: "Lecture",
    color: "bg-blue-100",
  },
  {
    day: "Monday",
    time: "13:30 - 15:00",
    course: "Database Systems",
    room: "Lab B-202",
    type: "TP",
    color: "bg-orange-100",
  },
  {
    day: "Wednesday",
    time: "15:15 - 16:45",
    course: "Final Exams - Mathematics",
    room: "",
    type: "",
    color: "bg-red-100",
  },
  {
    day: "Friday",
    time: "08:00 - 09:30",
    course: "Software Engineering",
    room: "Room B-101",
    type: "TD",
    color: "bg-green-100",
  },
];

export function Timetable() {
  // Function to get class for a specific day and time
  const getClass = (day: string, time: string) => {
    return scheduleData.find((item) => item.day === day && item.time === time);
  };

  // Class badge component
  const ClassBadge = ({ type }: { type: string }) => {
    if (!type) return null;

    const bgColorClass =
      type === "Lecture"
        ? "bg-blue-500"
        : type === "TD"
        ? "bg-green-500"
        : "bg-orange-500";

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full ${bgColorClass} text-white`}
      >
        {type}
      </span>
    );
  };

  // Class cell component
  const ClassCell = ({ classData }: { classData: any }) => {
    if (!classData) {
      return (
        <div className="text-xs text-gray-400 h-full flex items-center justify-center">
          Available
        </div>
      );
    }

    return (
      <div className={`${classData.color} p-2 rounded-md h-full flex flex-col`}>
        <div className="font-medium text-sm">{classData.course}</div>
        {classData.room && (
          <div className="text-xs text-gray-600">{classData.room}</div>
        )}
        {classData.type && (
          <div className="mt-auto">
            <ClassBadge type={classData.type} />
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
        <div className="grid grid-cols-6 border-b">
          <div className="p-3 font-medium border-r"></div>
          {timeSlots.map((time) => (
            <div key={time} className="p-3 font-medium text-center text-xs">
              {time}
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day} className="grid grid-cols-6 border-b last:border-b-0">
            <div className="p-3 font-medium border-r">{day}</div>
            {timeSlots.map((time) => {
              const classData = getClass(day, time);
              return (
                <div key={`${day}-${time}`} className="p-2 min-h-24">
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
