"use client";

import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";
import "./dashboard.css";
import AuthGuard from "@/components/auth-guard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    <div className="min-w-90 pt-8">{children}</div>
                </main>
            </div>
        </AuthGuard>
    );
}
