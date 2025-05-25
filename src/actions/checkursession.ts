import { SessionResponse, SwapRequest } from "@/types/swap";

export const GetSection = async (data: SwapRequest): Promise<SessionResponse> => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v0/urtimes/`, {
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
