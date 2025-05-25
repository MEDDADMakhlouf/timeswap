import { SessionResponse, SwapRequest } from "@/types/swap";
import { Ursession } from "@/types/table";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const Fetchschedule = async (): Promise<Ursession[]> => {
    try {
        const response = await fetchWithAuth(`${API_URL}/urtimeschedule/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("auth_access_token")}`,
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
