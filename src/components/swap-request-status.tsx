import { Check, Clock, X } from "lucide-react";

interface SwapRequestStatusProps {
    status: "accepted" | "pending" | "rejected";
}

export function SwapRequestStatus({ status }: SwapRequestStatusProps) {
    if (status === "accepted") {
        return (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                <Check className="h-4 w-4" />
                Accepted
            </div>
        );
    }

    if (status === "pending") {
        return (
            <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                Pending
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
            <X className="h-4 w-4" />
            Rejected
        </div>
    );
}
