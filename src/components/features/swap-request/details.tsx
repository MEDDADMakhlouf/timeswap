import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SwapRequestStatus } from "./status";

interface SwapRequestDetailsProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    data?: {
        subject: string;
        type: string;
        date: string;
        requestedBy: string;
        requestedTo: string;
        room: string;
        newRoom: string;
        status: "accepted" | "pending" | "rejected";
    };
}

export function SwapRequestDetails({ open: externalOpen, onOpenChange, data }: SwapRequestDetailsProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const open = externalOpen !== undefined ? externalOpen : internalOpen;
    const handleOpenChange = (newOpen: boolean) => {
        if (onOpenChange) {
            onOpenChange(newOpen);
        } else {
            setInternalOpen(newOpen);
        }
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
                            <span>{data?.subject}</span>
                            <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-500 text-white">
                                {data?.type}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-gray-500">Date :</div>
                        <div>{data?.date}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-gray-500">Requested by:</div>
                        <div>{data?.requestedBy}</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-gray-500">Requested to:</div>
                        <div>{data?.requestedTo}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="text-gray-500">Room :</div>
                            <div>{data?.room}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-gray-500">New Room :</div>
                            <div>{data?.newRoom}</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-gray-500">Status :</div>
                        <div>
                            <SwapRequestStatus status={data?.status || "pending"} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
