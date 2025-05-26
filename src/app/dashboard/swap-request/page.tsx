"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircleIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SwapRequestTable } from "@/components/features/swap-request/table"; // Make sure this component can accept data as props
import { SwapRequestFilter } from "@/components/features/swap-request/filter";
import { fetchSwapRequest } from "@/actions/fetchswaprequest";
import { SessionSwap } from "@/types/session";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function SwapRequestPage() {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery<SessionSwap[]>({
        queryKey: ["swapRequests"],
        queryFn: fetchSwapRequest,
        staleTime: 1000 * 60 * 5,
    });

    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleRequestUpdate = () => {
        queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
    };

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Swap Request</h1>
                <p className="text-gray-500">Request, View and search your past swap requests</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search by subject, teacher, or date..." className="pl-8" />
                </div>
                <div className="flex gap-4 items-stretch">
                    <SwapRequestFilter label="All Statuses" />
                    <SwapRequestFilter label="All Types" />
                    <Link href="/dashboard/swap-request/create">
                        <Button className="gap-2">
                            Swap Request
                            <PlusCircleIcon />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Pass the data to SwapRequestTable */}
            <SwapRequestTable data={data ?? []} onRequestUpdate={handleRequestUpdate} />
        </div>
    );
}
