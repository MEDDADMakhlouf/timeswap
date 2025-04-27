"use client";
import { useState } from 'react';
import { Button } from './ui/button';

export default function Firstpage() {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleNextStep = () => {
    const sessionData = {
      day: selectedDay,
      time: selectedTime,
      type: selectedType,
    };

    console.log('Sending to backend:', sessionData);

    // Example: sending the data
    // fetch('/api/session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(sessionData),
    // });
  };

  const handleCancel = () => {
    setSelectedDay('');
    setSelectedTime('');
    setSelectedType('');
  };

  return (
    <div className="flex flex-col  min-h-screen p-4"> 
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
        className="px-4 py-2 min-w-[300px]  rounded-md bg-white border text-lg mb-6" 
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Select Session Type</option>
        <option value="Lesson">Course</option>
        <option value="TD">TD</option>
        <option value="TP">TP</option>
      </select>

      <div className="flex gap-4 mt-4 justify-end "> 
        <Button
          onClick={handleNextStep}
          style={{ backgroundColor: '#0334BC' }}
          className="px-6 py-2  text-white font-bold rounded-md hover:bg-blue-700"
        >
          Next Step
        </Button>

        <Button
          onClick={handleCancel}
          variant={"ghost"}
            className="px-6 py-2  text-black   border-[1px]  font-bold rounded-md "
         
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
