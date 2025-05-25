import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SwapRequestFilterProps {
    label: string;
}

export function SwapRequestFilter({ label }: SwapRequestFilterProps) {
    return (
        <Select>
            <SelectTrigger className="h-full">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                {label == "All Types" ? (
                    <>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="lesson">Lesson</SelectItem>
                        <SelectItem value="td">TD</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                    </>
                ) : (
                    <>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </>
                )}
            </SelectContent>
        </Select>
    );
}
