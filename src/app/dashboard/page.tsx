import { Bell, Calendar } from "lucide-react";
import { UserAvatar } from "@/components/features/dashboard/user-avatar";
import { SwapRequestNotification } from "@/components/features/swap-request/notification";
import { Timetable } from "@/components/timetable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
     const username=localStorage.getItem("username") || "";
    return (
        <div className="p-6 space-y-8">
            <div className="flex items-center justify-between pt-8">
                <div>
                    <h1 className="text-2xl font-bold">Hello Prof.{username}  </h1>
                    <p className="text-gray-500">Welcome back! Here's your workspace.</p>
                </div>
                <UserAvatar name={username} className="h-12 w-12" />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-gray-700 font-semibold flex items-center gap-2">
                        <Bell className="size-4" />
                        Recent Notification
                    </h2>
                    <Link href="/dashboard/notifications">
                        <Button variant="ghost">View All</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <SwapRequestNotification
                        type="new"
                        message="Prof. wail has requested to swap Physics 202 on March 26, 2025 for Computer Networks"
                        time="10 minutes ago"
                    />
                    <SwapRequestNotification
                        type="rejected"
                        message="Prof. Nsalah has has rejected your swap request for Computer Networks on March 2 2025"
                        time="10 minutes ago"
                    />
                </div>
            </div>

            <hr className="w-[98%] mx-auto border-t border-gray-200" />

            <div>
                <h2 className="text-gray-700 font-semibold flex items-center gap-2 mb-4">
                    <Calendar className="size-5" />
                    My TimeTable
                </h2>
                <Timetable />
            </div>
        </div>
    );
}
