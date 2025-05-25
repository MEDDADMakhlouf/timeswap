"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSwapRequestStore } from "@/stores/swap-requests"; // Zustand store
import { ArrowLeftRight, Bell, Home, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-provider";

export function Sidebar() {
    const pathname = usePathname();
    const pendingCount = useSwapRequestStore((state) => state.pendingCount); // Get pending swap requests from Zustand store
    const [isOpen, setIsOpen] = useState(true);
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    const navItems = [
        {
            name: "Home",
            href: "/dashboard",
            icon: <Home className="size-5" />,
        },
        {
            name: "Swap Request",
            href: "/dashboard/swap-request",
            icon: <ArrowLeftRight className="size-5" />,
        },
        {
            name: "Notifications",
            href: "/dashboard/notifications",
            icon: <Bell className="size-5" />,
            badge: pendingCount > 0 ? pendingCount : null, // Display badge if there are pending requests
        },
    ];

    // Desktop layout: full sidebar with nav items
    return (
        <div
            className={cn(
                "w-56 border-r bg-white flex flex-col h-full max-md:absolute top-0 left-0 transition-all duration-300",
                !isOpen && "-left-56 md:w-0",
            )}
        >
            <div className="py-8 px-4 relative">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative">
                        <img src="/logo-small.svg" alt="" />
                    </div>
                </Link>
                <button
                    className="absolute top-5 -right-4 bg-background text-foreground rounded-full p-2 z-30 border-t border-r border-b cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu className="size-5" />
                </button>
            </div>
            <nav className="flex-1 overflow-hidden">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-blue-100 text-blue-600" // active link style
                                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600", // hover effect
                                )}
                            >
                                {item.icon}
                                {item.name}
                                {item.badge && (
                                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-fit ms-auto"
                >
                    <LogOut className="h-5 w-5" />
                    Log out
                </button>
            </div>
        </div>
    );
}
