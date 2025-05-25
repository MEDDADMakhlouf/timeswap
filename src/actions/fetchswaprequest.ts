import { SessionSwap } from "@/types/session";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const fetchSwapRequest = async (): Promise<SessionSwap[]> => {
    try {
        const response = await fetchWithAuth(`${API_URL}/ntoif/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
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
