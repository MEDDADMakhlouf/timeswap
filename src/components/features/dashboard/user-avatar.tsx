import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    name: string;
    image?: string;
    className?: string;
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
    // Get initials from name
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

    return (
        <Avatar className={className}>
            {image && <AvatarImage src={image} alt={name} />}
            <AvatarFallback className="bg-blue-100 text-blue-800">{initials}</AvatarFallback>
        </Avatar>
    );
}
