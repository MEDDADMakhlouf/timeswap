import { SessionSwap } from "@/types/Session";
import { AlertTriangle, Check, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type NotificationItemProps = {
  swapRequest: SessionSwap;
};

export function NotificationItem({ swapRequest }: NotificationItemProps) {
  const { status, from_session, to_session } = swapRequest;

  const type =
    status === "PENDING"
      ? "new"
      : status === "APPROVED"
        ? "accepted"
        : status === "REJECTED"
          ? "rejected"
          : "info";

  const title = `Swap Request from ${from_session.module} to ${to_session.module}`;
  const message = `You requested to swap your session on ${from_session.week_day} at ${from_session.starting_time} with one on ${to_session.week_day} at ${to_session.starting_time}`;
  const time = new Date().toLocaleTimeString(); 

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-full p-2 ${
              type === "new"
                ? "bg-yellow-100 text-yellow-600"
                : type === "accepted"
                ? "bg-green-100 text-green-600"
                : type === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {type === "new" ? (
              <div className="h-5 w-5 rounded-full border-2 border-current" />
            ) : type === "accepted" ? (
              <Check className="h-5 w-5" />
            ) : type === "rejected" ? (
              <X className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
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
  );
}

