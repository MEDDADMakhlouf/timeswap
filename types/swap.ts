export type SwapRequest = {
  session_type: string;
  start_time: string;
  end_time: string;
  week_day: string;
};
export  interface SessionResponse {
  id: number;
  module: string;
  room: {
    id: number;
    room_id: string;
    equipment: any[]; // If you know the type of equipment, change 'any' to a proper type
  };
  session_type: string; // or make it a union type like: "TD" | "TP" | etc.
  schedule: number;
  starting_time: string; // Format: "HH:MM"
  ending_time: string;   // Format: "HH:MM"
  week_day: string;      // You can also narrow it: "SUNDAY" | "MONDAY" | etc.
  teacher: {
    id: number;
    username: string;
    email: string;
  };
}
