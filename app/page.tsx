import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-6xl h-dvh flex items-center justify-center flex-col">
      Dashboard
      <div className="space-x-4">
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
