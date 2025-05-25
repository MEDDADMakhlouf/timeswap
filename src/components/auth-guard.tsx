"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-provider";

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated, "isLoading", isLoading);
        // Only redirect if not authenticated AND not loading
        if (!isAuthenticated && !isLoading) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Loading...</h2>
                    <p className="mt-2">Please wait while we verify your authentication</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Please log in</h2>
                    <p className="mt-2">You need to be logged in to view this page</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
