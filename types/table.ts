export type Ursession = {
    id: number;
    module: string; // or string, depending on how you're serializing the related model
    room: string;   // same here: could be number or object/string if you're using nested serialization
    session_type: string;
    starting_time: string; // ISO time string, e.g. "14:30:00"
    ending_time: string;   // ISO time string
    week_day: string;  
    // likely values: "Monday", "Tuesday", etc. (or use enum if known)
  };
  