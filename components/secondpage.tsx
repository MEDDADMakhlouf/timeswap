
import React from 'react';
import { SessionResponse } from '@/types/swap';
import { Button } from './ui/button';
import { CreateSwapRequest } from '@/actions/createswaprequest';
import { NewswapRequest, NewSwapRequest, Session } from '@/types/Session';

import { useRouter } from 'next/navigation';


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

  const handleBack = () => {
    setPhase(phase - 1);
  };

  const handleConfirm = () => {
   
    console.log('Confirmed swap:', { fromsession, tosession });

    const newswaprequest: NewswapRequest = {
      from_session:fromsession?.id as number,
      to_session: tosession?.id as number,
    }; 

    CreateSwapRequest(newswaprequest)
      .then((response) => {
        console.log(response);
        setPhase(phase + 1);
        router.push('/dashboard/swap-request');
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });


   
  };

  const renderSession = (session: SessionResponse | null, label: string) => {
    console.log(fromsession?.teacher.email)
    if (!session) return <p>{label} session not selected.</p>;

    return (
      <div className="border p-4 rounded-lg shadow-md mb-4 bg-white">
        <h2 className="text-xl font-bold mb-2">{label} Session</h2>
        <p><strong>Module:</strong> {session.module}</p>
        <p><strong>Teacher:</strong> {session.teacher.email}</p>
        <p><strong>Room:</strong> {session.room.room_id}</p>
        <p><strong>Time:</strong> {session.starting_time} - {session.ending_time}</p>
        <p><strong>Day:</strong> {session.week_day}</p>
        <p><strong>Type:</strong> {session.session_type}</p>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Review Your Swap</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSession(fromsession, 'From')}
        {renderSession(tosession, 'To')}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="px-6 py-2 border text-black font-bold rounded-md"
        >
          Go Back
        </Button>
        <Button
          onClick={handleConfirm}
          style={{ backgroundColor: '#0334BC' }}
          className="px-6 py-2 text-white font-bold rounded-md hover:bg-blue-700"
        >
          Confirm Swap
        </Button>
      </div>
    </div>
  );
}
