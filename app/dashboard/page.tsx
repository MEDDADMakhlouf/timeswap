import { Calendar, Clock } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { SwapRequestNotification } from "@/components/swap-request-notification";
import { Timetable } from "@/components/timetable";

export default function HomePage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hello Prof. Neila Hoacine! 👋</h1>
          <p className="text-gray-500">Welcome back! Here's your workspace.</p>
        </div>
        <UserAvatar name="Neila Hoacine" className="h-12 w-12" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl text-[#71717A] font-semibold flex items-center gap-2 mb-4">
          <img src="/notification.svg" alt="" />
          Recent Notification
        </h2>
        <hr className="w-[98%] mx-auto border-t border-[#d0dff6] mb-4" />

        <div className="grid gap-4 md:grid-cols-2">
          <SwapRequestNotification
            type="new"
            message="Prof. Neila Hocini has requested to swap Physics 202 on March 26, 2025 for Computer Networks"
            time="10 minutes ago"
          />
          <SwapRequestNotification
            type="rejected"
            message="Prof. Neila Hocini has has rejected your swap request for Computer Networks on March 2 2025"
            time="10 minutes ago"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl text-[#71717A] font-semibold flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5" />
          My TimeTable
        </h2>
        <Timetable />
      </div>
    </div>
  );
}
