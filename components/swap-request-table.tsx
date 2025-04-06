"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SwapRequestStatus } from "@/components/swap-request-status";
import { SwapRequestDetails } from "@/components/swap-request-details";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data
const swapRequests = [
  {
    id: 1,
    date: "March 20, 2025",
    subject: "Database Systems",
    professor: "Zeghedani Salah eddine",
    type: "Cour",
    room: "214D",
    newRoom: "214D",
    status: "accepted" as const,
  },
  {
    id: 2,
    date: "March 20, 2025",
    subject: "Algorithms",
    professor: "Zeghedani Salah eddine",
    type: "TD",
    room: "214D",
    newRoom: "214D",
    status: "pending" as const,
  },
  {
    id: 3,
    date: "March 20, 2025",
    subject: "Database Systems",
    professor: "Zeghedani Salah eddine",
    type: "TP",
    room: "214D",
    newRoom: "214D",
    status: "rejected" as const,
  },
  {
    id: 4,
    date: "March 20, 2025",
    subject: "Algorithms",
    professor: "Zeghedani Salah eddine",
    type: "TD",
    room: "214D",
    newRoom: "214D",
    status: "pending" as const,
  },
  {
    id: 5,
    date: "March 20, 2025",
    subject: "Programming Languages",
    professor: "Zeghedani Salah eddine",
    type: "Cour",
    room: "214D",
    newRoom: "214D",
    status: "rejected" as const,
  },
  {
    id: 6,
    date: "March 20, 2025",
    subject: "Algorithms",
    professor: "Zeghedani Salah eddine",
    type: "TD",
    room: "214D",
    newRoom: "214D",
    status: "accepted" as const,
  },
  {
    id: 7,
    date: "March 20, 2025",
    subject: "Database Systems",
    professor: "Zeghedani Salah eddine",
    type: "Cour",
    room: "214D",
    newRoom: "214D",
    status: "accepted" as const,
  },
];

export function SwapRequestTable() {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (id: number) => {
    setSelectedRequest(id);
    setDetailsOpen(true);
  };

  const currentRequest =
    selectedRequest !== null
      ? swapRequests.find((req) => req.id === selectedRequest)
      : null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left font-medium w-10">
              <Checkbox />
            </th>
            <th className="p-3 text-left font-medium w-36">Date</th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Subject
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M8 4L5 7M8 4L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Professor
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M8 4L5 7M8 4L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </th>
            <th className="p-3 text-left font-medium w-20">
              <div className="flex items-center gap-1">
                Type
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M8 4L5 7M8 4L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </th>
            <th className="p-3 text-left font-medium w-24">
              <div className="flex items-center gap-1">
                Room
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M8 4L5 7M8 4L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </th>
            <th className="p-3 text-left font-medium w-24">
              <div className="flex items-center gap-1">
                New Room
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M8 4L5 7M8 4L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </th>
            <th className="p-3 text-left font-medium w-32">
              <div className="flex items-center gap-1">
                Status
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4V12M8 4L5 7M8 4L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </th>
            <th className="p-3 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {swapRequests.map((request) => (
            <tr
              key={request.id}
              className="border-b last:border-b-0 hover:bg-gray-50"
            >
              <td className="p-3">
                <Checkbox />
              </td>
              <td className="p-3 text-sm">{request.date}</td>
              <td className="p-3 text-sm">{request.subject}</td>
              <td className="p-3 text-sm">{request.professor}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-md ${
                    request.type === "Cour"
                      ? "bg-blue-500 text-white"
                      : request.type === "TD"
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {request.type}
                </span>
              </td>
              <td className="p-3 text-sm">{request.room}</td>
              <td className="p-3 text-sm">{request.newRoom}</td>
              <td className="p-3">
                <SwapRequestStatus status={request.status} />
              </td>
              <td className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(request.id)}
                    >
                      View Details
                    </DropdownMenuItem>
                    {request.status === "pending" && (
                      <>
                        <DropdownMenuItem>Accept</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">Page 1 of 10</div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 12L7 8L11 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button variant="outline" size="icon" disabled>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L5 8L9 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4L11 8L7 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button variant="outline" size="icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 4L9 8L5 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Request Details Modal */}
      <SwapRequestDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={
          currentRequest
            ? {
                subject: currentRequest.subject,
                type: currentRequest.type,
                date: "Monday, 08:00 - 09:30", // This would come from the actual data
                section: "C", // This would come from the actual data
                requestedBy: "Neila Hoacine", // This would come from the actual data
                requestedTo: "Lina Haddad", // This would come from the actual data
                room: currentRequest.room,
                newRoom: currentRequest.newRoom,
                status: currentRequest.status,
              }
            : undefined
        }
      />
    </div>
  );
}
