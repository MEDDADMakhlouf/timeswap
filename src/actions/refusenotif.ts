import axios from "axios";
import { ENDPOINTS } from "@/urls";

export const getRefuseNotification = async (id: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v0/swap-requests/${id}/reject/`, {
            method: "GET",
            mode: "cors",
            headers: {},
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.status;
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        throw error;
    }
};
