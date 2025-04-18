import { SessionSwap } from "@/types/Session";

export const fetchswaprequest = async (): Promise<SessionSwap[]> => {
    try {
      const response = await fetch("http://127.0.0.1:8004/api/v0/ntoif/", {
        method: "GET", 
        mode: "cors", 
        headers: {
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
  
      const json: SessionSwap[] = await response.json();  
  
      return json;  
  
    } catch (error) {
      console.error("Error fetching swap requests:", error);
      throw error;
    }
  };
  