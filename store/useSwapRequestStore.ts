import { create } from "zustand";
import type { SessionSwap } from "@/types/Session";

type SwapRequestStore = {
  requests: SessionSwap[];
  pendingCount: number;
  setRequests: (data: SessionSwap[]) => void;
};

export const useSwapRequestStore = create<SwapRequestStore>((set) => ({
  requests: [],
  pendingCount: 0,
  setRequests: (data) =>
    set({
      requests: data,
      pendingCount: data.filter((r) => r.status === "PENDING").length,
    }),
}));
