import { NewswapRequest, NewSwapRequest } from "@/types/session";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { fetchWithAuth } from "@/lib/fetch-with-auth";

export const CreateSwapRequest = async (data: NewswapRequest) => {
    try {
        const response = await fetchWithAuth(`http://127.0.0.1:8000/api/v0/create/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
    }
};
