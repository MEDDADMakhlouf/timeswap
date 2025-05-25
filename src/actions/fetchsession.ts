import { SwapRequest } from "@/types/swap";
import { SessionResponse } from "@/types/swap";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const FetchSession = async (data: SwapRequest): Promise<SessionResponse[]> => {
    try {
        const response = await fetchWithAuth(`${API_URL}/available/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(JSON.stringify(data));
        console.log(response);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const responseData = (await response.json()) as SessionResponse[];
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
    }
};
