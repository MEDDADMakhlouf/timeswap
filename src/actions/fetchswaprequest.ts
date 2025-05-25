import { SessionSwap } from "@/types/session";
import { fetchWithAuth } from "@/lib/fetch-with-auth";

export const fetchswaprequest = async (): Promise<SessionSwap[]> => {
    try {
        const response = await fetchWithAuth("http://127.0.0.1:8000/api/v0/ntoif/", {
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
