import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SwapRequestStatus } from "./swap-request-status";

interface SwapRequestDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  data?: {
    subject: string;
    type: string;
    date: string;
    section: string;
    requestedBy: string;
    requestedTo: string;
    room: string;
    newRoom: string;
    status: "accepted" | "pending" | "rejected";
  };
}

export function SwapRequestDetails({
  open: externalOpen,
  onOpenChange,
  data,
}: SwapRequestDetailsProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  // Default data for demo purposes
  const requestData = data || {
    subject: "Algorithm",
    type: "Cour",
    date: "Monday, 08:00 - 09:30",
    section: "C",
    requestedBy: "Neila Hoacine",
    requestedTo: "Lina Haddad",
    room: "215D",
    newRoom: "425D",
    status: "accepted" as const,
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Request details</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => handleOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-gray-500">Subject :</div>
            <div className="flex items-center gap-2">
              <span>{requestData.subject}</span>
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-500 text-white">
                {requestData.type}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-500">Date :</div>
            <div>{requestData.date}</div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-500">section :</div>
            <div>{requestData.section}</div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-500">Requested by:</div>
            <div>{requestData.requestedBy}</div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-500">Requested to:</div>
            <div>{requestData.requestedTo}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-gray-500">Room :</div>
              <div>{requestData.room}</div>
            </div>

            <div className="space-y-2">
              <div className="text-gray-500">New Room :</div>
              <div>{requestData.newRoom}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-500">Status :</div>
            <div>
              <SwapRequestStatus status={requestData.status} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
