import { SessionSwap } from "@/types/Session";

type SessionSwapResponse = {
  data: SessionSwap[];
  message: string;
  status: number;
};

export const fetchswaprequest = async (): Promise<SessionSwap[]> => {
  const response = await fetch("http://127.0.0.1:8004/api/v0/ntoif/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const json: SessionSwapResponse = await response.json();

  // Always return SessionSwap[], never undefined
  if (!Array.isArray(json.data)) {
    throw new Error("Invalid response format: data is not an array");
  }

  return json.data;
};
