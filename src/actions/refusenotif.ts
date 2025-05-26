import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const rejectSwapRequest = async (id: string) => {
    try {
        const response = await fetchWithAuth(`${API_URL}/swap-requests/${id}/reject/`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.status;
    } catch (error) {
        console.error("Error rejecting swap request:", error);
        throw error;
    }
};
