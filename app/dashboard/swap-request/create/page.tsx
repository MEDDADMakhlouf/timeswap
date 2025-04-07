"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function CreateSwapRequestPage() {
  const [step, setStep] = useState(1)
  const [swapType, setSwapType] = useState("entire")
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSession, setSelectedSession] = useState<boolean>(false)

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    }
  }

  const handleSelectSession = () => {
    setSelectedSession(true)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <Link href="/swap-request" className="flex items-center gap-2 text-blue-600 mb-4">
          <ChevronLeft className="h-4 w-4" />
          Swap Request Form
        </Link>

        <h1 className="text-2xl font-bold mb-1">Create Swap Request</h1>
        <p className="text-gray-500">Select a session you want to swap and a teacher to swap with</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.6666 5L7.49992 14.1667L3.33325 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 h-1 bg-gray-200 rounded-full">
          <div className={`h-full bg-blue-600 rounded-full ${step >= 2 ? "w-full" : "w-0"}`}></div>
        </div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.6666 5L7.49992 14.1667L3.33325 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex gap-4 text-sm font-medium text-gray-500 mb-4">
        <div className="text-blue-600">Step {step}</div>
      </div>

      <div className="border-t pt-6">
        {step === 1 ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Select a New Time Slot</h2>
              {!selectedSession ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select onValueChange={(value) => setSelectedDay(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => setSelectedTime(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-930">08:00 - 09:30</SelectItem>
                      <SelectItem value="945-1115">09:45 - 11:15</SelectItem>
                      <SelectItem value="1130-1300">11:30 - 13:00</SelectItem>
                      <SelectItem value="1330-1500">13:30 - 15:00</SelectItem>
                      <SelectItem value="1515-1645">15:15 - 16:45</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Subject :</span>
                      <span>Algorithm</span>
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-500 text-white">Cour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Date :</span>
                      <span>Monday, 08:00 - 09:30</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">section :</span>
                      <span>C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Room :</span>
                      <span>415D</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Reason for swap (optional)</h2>
              <Textarea placeholder="Provide a reason for the swap request..." className="min-h-24" />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              {selectedDay && selectedTime ? (
                <Button onClick={handleSelectSession}>Select Session</Button>
              ) : selectedSession ? (
                <Button onClick={handleNextStep}>Next Step</Button>
              ) : (
                <Button disabled>Next Step</Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Select a New Time Slot</h2>
              <Select defaultValue="monday-8">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Monday, 08:00 - 09:30  Room : 415D" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday-8">Monday, 08:00 - 09:30 Room : 415D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Reason for swap (optional)</h2>
              <Textarea placeholder="Provide a reason for the swap request..." className="min-h-24" />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="p-3 font-medium bg-blue-50 border-b">Current Session</div>
                <div className="p-3 font-medium bg-blue-50 border-b">Requested Change</div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <div className="p-3">Subject: Algorithm (Cour)</div>
                <div className="p-3">Subject: Algorithm (Cour)</div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <div className="p-3">Time: Mon 08:00-09:30</div>
                <div className="p-3">New Time: Mon 09:30-11:00</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="p-3">Room: 415D</div>
                <div className="p-3">New Room: 410B</div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Cancel
              </Button>
              <Button>Submit Request</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

