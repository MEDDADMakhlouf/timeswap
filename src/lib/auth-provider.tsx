"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { fetchWithAuth } from "./fetch-with-auth";
import { API_URL } from "../config/env";

// Define auth context types
type AuthContextType = {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: ({ username, password }: { username: string; password: string }) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("auth_access_token");
        const storedRefreshToken = localStorage.getItem("auth_refresh_token");
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);
        }
        setIsLoading(false);
    }, []);

    const login = async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await fetchWithAuth(`${API_URL}/auth/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({ username, password }),
            });
            console.log(JSON.stringify({ username, password }))

            const data = await response.json();

            console.log(data);
            if (response.ok) {
                localStorage.setItem("auth_access_token", data.access);
                localStorage.setItem("auth_refresh_token", data.refresh);
                setAccessToken(data.access);
                setRefreshToken(data.refresh);
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("auth_access_token");
        localStorage.removeItem("auth_refresh_token");
        setAccessToken(null);
        setRefreshToken(null);
    };

    const value = {
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
