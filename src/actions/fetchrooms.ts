import { Room } from "@/types/session";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { API_URL } from "@/config/env";

export const FetchRooms = async (): Promise<Room[]> => {
    try {
        const response = await fetchWithAuth(`${API_URL}/rooms/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth_access_token")}`,
            },
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const responseData = (await response.json()) as Room[];
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
};
