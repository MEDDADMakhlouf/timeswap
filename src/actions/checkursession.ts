import { SessionResponse, SwapRequest } from "@/types/swap";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const GetSection = async (data: Omit<SwapRequest, "session_type">): Promise<SessionResponse> => {
    try {
        const response = await fetchWithAuth(`${API_URL}/urtimes/`, {
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
        const responseData = await response.json();
        console.log(responseData);

        return responseData;
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
    }
};
