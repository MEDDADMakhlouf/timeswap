import { SessionResponse, SwapRequest } from "@/types/swap";
import { Ursession } from "@/types/table";

export const Fetchschedule = async (): Promise<Ursession[]> => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v0/urtimeschedule/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const responseData = (await response.json()) as Ursession[];
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
    }
};
