"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, FlipHorizontalIcon as SwapHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useIsMobile } from "@/hooks/use-mobile"; // custom hook to detect mobile screens
import { useSwapRequestStore } from "@/stores/swap-requests"; // Zustand store

export function Sidebar() {
    const pathname = usePathname();
    const isMobile = useIsMobile(); // Check if the user is on a mobile screen
    const pendingCount = useSwapRequestStore((state) => state.pendingCount); // Get pending swap requests from Zustand store

    const navItems = [
        {
            name: "Home",
            href: "/dashboard",
            icon: "/home.svg",
        },
        {
            name: "Swap Request",
            href: "/dashboard/swap-request",
            icon: "/swap.svg",
        },
        {
            name: "Notifications",
            href: "/dashboard/notifications",
            icon: "/notification.svg",
            badge: pendingCount > 0 ? pendingCount : null, // Display badge if there are pending requests
        },
    ];

    if (isMobile) {
        // Mobile layout: render a dropdown for navigation
        return (
            <div className="w-full border-b bg-white px-4 py-3">
                <select
                    onChange={(e) => (window.location.href = e.target.value)} // Navigate to the selected URL
                    className="w-full rounded-md border px-3 py-2 text-sm text-gray-700"
                    value={pathname}
                >
                    {navItems.map((item) => (
                        <option key={item.name} value={item.href}>
                            {item.name} {item.badge ? `(${item.badge})` : ""}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // Desktop layout: full sidebar with nav items
    return (
        <div className="w-56 border-r bg-white flex flex-col h-full">
            <div className="p-4">
                <Logo />
            </div>
            <nav className="flex-1">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-blue-50 text-blue-600" // active link style
                                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600", // hover effect
                                )}
                            >
                                <img
                                    src={item.icon}
                                    className={pathname === item.href ? "text-blue-600" : "text-gray-500"} // Icon color change
                                />
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
                <Link
                    href="/logout"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                    {/* <LogOut className="h-5 w-5" /> */}
                    Log out
                </Link>
            </div>
        </div>
    );
}
