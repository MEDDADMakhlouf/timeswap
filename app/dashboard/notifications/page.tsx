"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationItem } from "@/components/notification-item"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Notifications</h1>
        <p className="text-gray-500">Stay updated with your swap requests and schedule changes</p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-blue-50 p-1 mb-6">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
          >
            Rejected
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-6"
          >
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <NotificationItem
            type="new"
            title="New Swap Request"
            message="Prof. Neila Hocini has requested to swap Physics 202 on March 25, 2025 for Computer Networks"
            time="10 minutes ago"
          />
          <NotificationItem
            type="accepted"
            title="Swap Request Accepted"
            message="Prof. Neila Hocini has accepted your swap request for Mathematics 101on March 25, 2025"
            time="10 minutes ago"
          />
          <NotificationItem
            type="rejected"
            title="Swap Request Rejected"
            message="Prof. Neila Hocini has has rejected your swap request for Computer Networks on March 2 2025"
            time="10 minutes ago"
          />
          <NotificationItem
            type="alert"
            title="Schedule Change"
            message="Your Algorithms class on Tuesday has been moved to Room 101D"
            time="10 minutes ago"
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <NotificationItem
            type="new"
            title="New Swap Request"
            message="Prof. Neila Hocini has requested to swap Physics 202 on March 25, 2025 for Computer Networks"
            time="10 minutes ago"
          />
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <NotificationItem
            type="accepted"
            title="Swap Request Accepted"
            message="Prof. Neila Hocini has accepted your swap request for Mathematics 101on March 25, 2025"
            time="10 minutes ago"
          />
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <NotificationItem
            type="rejected"
            title="Swap Request Rejected"
            message="Prof. Neila Hocini has has rejected your swap request for Computer Networks on March 2 2025"
            time="10 minutes ago"
          />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <NotificationItem
            type="alert"
            title="Schedule Change"
            message="Your Algorithms class on Tuesday has been moved to Room 101D"
            time="10 minutes ago"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

