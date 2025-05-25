"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationItem } from "@/components/features/notifcations/notification-item";
import { useQuery } from "@tanstack/react-query";
import { fetchswaprequest } from "@/actions/fetchswaprequest";
import type { SessionSwap } from "@/types/session";
import { useSwapRequestStore } from "@/stores/swap-requests"; // adjust path as needed

export default function NotificationsPage() {
    const { data, error, isLoading } = useQuery<SessionSwap[]>({
        queryKey: ["swapRequests"],
        queryFn: fetchswaprequest,
    });
    const setRequests = useSwapRequestStore((state) => state.setRequests);

    console.log(data);
    useEffect(() => {
        if (data && !isLoading && !error) {
            setRequests(data);
        }
    }, [data, isLoading, error, setRequests]);
    const [activeTab, setActiveTab] = useState("all");

    if (error) return <div>Error: {error.message}</div>;
    if (!data || isLoading) return <div>Loading...</div>;

    // Take the last 15 swaps, assuming newest are last. Reverse if needed.
    const recent = data.slice(-15).reverse();

    const allNotifications = recent.map((swap) => ({
        swapRequest: swap, // Pass the entire session swap request
    }));

    // Filter by tab
    const filtered =
        activeTab === "all"
            ? allNotifications
            : allNotifications.filter((n) => n.swapRequest.status.toLowerCase() === activeTab);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Notifications</h1>
                <p className="text-gray-500">Stay updated with your swap requests and schedule changes</p>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-blue-50 p-1 mb-6">
                    {["all", "pending", "accepted", "rejected"].map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab}
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6 capitalize"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {["all", "pending", "accepted", "rejected"].map((tab) => (
                    <TabsContent key={tab} value={tab} className="space-y-4">
                        {filtered.length === 0 ? (
                            <div className="text-gray-500">No notifications found.</div>
                        ) : (
                            filtered.map((notification) => (
                                <NotificationItem key={notification.swapRequest.id} {...notification} />
                            ))
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
