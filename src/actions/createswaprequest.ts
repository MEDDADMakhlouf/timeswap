import { NewswapRequest, NewSwapRequest } from "@/types/session";
import { SessionResponse, SwapRequest } from "@/types/swap";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const CreateSwapRequest = async (data: NewswapRequest) => {
    try {
        const response = await fetchWithAuth(`${API_URL}/create/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("auth_access_token")}`,
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
    }
};
