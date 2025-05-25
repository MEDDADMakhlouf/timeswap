import { Check, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
interface SwapRequestNotificationProps {
    type: "new" | "rejected";
    message: string;
    time: string;
}

export function SwapRequestNotification({ type, message, time }: SwapRequestNotificationProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div>
                        {type === "new" ? <img src="/alarme.svg" alt="" /> : <img src="/echeck.svg" alt="" />}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                            {type === "new" ? "New Swap Request" : "Swap Request Rejected"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{message}</p>
                        <p className="text-xs text-gray-500">{time}</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-start gap-2 h-35px width-145">
                    {type === "new" ? (
                        <>
                            <Button size="sm">
                                <Check className="h-4 w-4" /> Accept
                            </Button>
                            <Button size="sm" variant="outline">
                                <img src="/false.svg" alt="" />
                                Decline
                            </Button>
                        </>
                    ) : (
                        <Button size="sm">
                            <img src="/flech.svg" alt="" />
                            View Details
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
