import { Check, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SwapRequestNotificationProps {
  type: "new" | "rejected"
  message: string
  time: string
}

export function SwapRequestNotification({ type, message, time }: SwapRequestNotificationProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-full p-2 ${type === "new" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}
          >
            {type === "new" ? (
              <div className="h-5 w-5 rounded-full border-2 border-current" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{type === "new" ? "New Swap Request" : "Swap Request Rejected"}</h3>
            <p className="text-sm text-gray-600 mb-2">{message}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          {type === "new" ? (
            <>
              <Button variant="outline" size="sm" className="gap-1">
                <X className="h-4 w-4" /> Decline
              </Button>
              <Button size="sm" className="gap-1">
                <Check className="h-4 w-4" /> Accept
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="gap-1">
              <Eye className="h-4 w-4" /> View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

