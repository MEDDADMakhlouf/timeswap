export type Equipment = {
  id: number;
  name: string;
  description: string;
};

export type Teacher = {
  id: number;
  username: string;
  email: string;
};

export type Room = {
  id: number;
  room_id: string;
  equipment: Equipment[];
};

export type Session = {
  id: number;
  module: string;
  room: Room;
  session_type: string;
  schedule: number;
  starting_time: string;
  ending_time: string;
  week_day: string;
  teacher: Teacher;
};

export type SessionSwap = {
  id: number;
  from_session: Session;
  to_session: Session;
  status: "PENDING" | "REJECTED" | "APPROVED";
};

