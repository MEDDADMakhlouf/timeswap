
import { SwapRequest } from "@/types/swap";

export const FetchSession = async (data: SwapRequest) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v0/sessions/available/`,
        {
        method: "POST", 
          mode: "cors", 
          headers: {
          },
          body: JSON.stringify(data)
        });
    
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return  response.status
      } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
      }

}
