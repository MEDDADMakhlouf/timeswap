import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SwapRequestFilterProps {
  label: string
}

export function SwapRequestFilter({ label }: SwapRequestFilterProps) {
  return (
    <Button variant="outline" className="gap-2">
      {label}
      <ChevronDown className="h-4 w-4" />
    </Button>
  )
}

