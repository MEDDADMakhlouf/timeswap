"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SwapRequestTable } from "@/components/swap-request-table";
import { SwapRequestFilter } from "@/components/swap-request-filter";
import { SwapRequestDetails } from "@/components/swap-request-details";

export default function SwapRequestPage() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Swap Request</h1>
        <p className="text-gray-500">
          Request, View and search your past swap requests
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by subject, teacher, or date..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-4">
          <SwapRequestFilter label="All Types" />
          <SwapRequestFilter label="All Statuses" />
          <Button className="gap-2" asChild>
            <Link href="/dashboard/swap-request/create">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10H13M7 10L10 7M7 10L10 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Swap Request
            </Link>
          </Button>
        </div>
      </div>

      <SwapRequestTable />
    </div>
  );
}
