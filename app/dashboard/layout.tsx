import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";
import "./dashboard.css";

export default function ({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
