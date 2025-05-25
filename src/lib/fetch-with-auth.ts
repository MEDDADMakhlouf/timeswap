"use client";

import { API_URL } from "../config/env";

/**
 * Fetch function that automatically includes the auth token in headers
 * and handles token refresh when needed
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const getAccessToken = () =>
        typeof window !== "undefined" ? localStorage.getItem("auth_access_token") : null;
    const getRefreshToken = () =>
        typeof window !== "undefined" ? localStorage.getItem("auth_refresh_token") : null;

    let accessToken = getAccessToken();

    // Initial headers with access token if available
    const headers = {
        ...options.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    // Make the initial request
    let response = await fetch(url, {
        ...options,
        headers,
    });

    // If the response is 401 (Unauthorized), try to refresh the token
    if (response.status === 401 && !url.includes("/auth/token/")) {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
            // Try to get a new access token
            const refreshResponse = await fetch(`${API_URL}/auth/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();

                // Save the new access token
                if (typeof window !== "undefined") {
                    localStorage.setItem("auth_access_token", data.access);
                }

                // Update headers with new access token
                const newHeaders = {
                    ...options.headers,
                    Authorization: `Bearer ${data.access}`,
                };

                // Retry the original request with the new token
                response = await fetch(url, {
                    ...options,
                    headers: newHeaders,
                });
            } else {
                // If refresh failed, clear tokens
                if (typeof window !== "undefined") {
                    localStorage.removeItem("auth_access_token");
                    localStorage.removeItem("auth_refresh_token");
                }
            }
        }
    }

    return response;
};
