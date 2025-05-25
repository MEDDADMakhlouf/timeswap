import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { createFallbackStream } from "./fallback";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const groq_api_key = "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";
export async function POST(req: Request) {
    try {
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();

        // Get the last user message for potential fallback
        const lastUserMessage = messages.findLast((m: any) => m.role === "user")?.content || "";

        // Log the incoming request for debugging (without sensitive data)
        console.log(
            "Chat API received request with messages:",
            messages.map((m: any) => ({ role: m.role, content: m.content.substring(0, 50) + "..." })),
        );

        // Validate that we have the GROQ_API_KEY
        if (groq_api_key === undefined) {
            console.error("GROQ_API_KEY is not defined");
            // Use fallback instead of failing
            console.log("API key missing, using fallback response");
            return createFallbackStream(lastUserMessage);
        }

        // System prompt to give context about TimeSwap
        const systemPrompt = `
      You are the TimeSwap assistant, a helpful AI that provides information about the TimeSwap platform.
      
      About TimeSwap:
      - TimeSwap is a scheduling platform that helps users manage timetables and swap requests
      - Key features include: intuitive timetable interface, swap requests, and real-time updates
      - Users can view their schedule, request swaps with other users, and receive notifications
      - TimeSwap is available for individuals, educators, and institutions
      
      Be friendly, concise, and helpful. If you don't know the answer to a question, don't make up information.
      Always maintain a professional but conversational tone.
    `;

        try {
            // Call the language model with the system prompt
            const result = streamText({
                model: groq("llama-3.1-8b-instant"),
                messages,
                system: systemPrompt,
                maxTokens: 1000, // Limit token count to avoid potential issues
            });

            // Respond with the stream
            return result.toDataStreamResponse({
                // Custom error handler for stream errors
                getErrorMessage: (error) => {
                    console.error("Stream error:", error);
                    return "Sorry, I'm having trouble generating a response right now. Please try again.";
                },
            });
        } catch (modelError) {
            console.error("Model error:", modelError);

            // Use fallback response generator
            console.log("Model error, using fallback response");
            return createFallbackStream(lastUserMessage);
        }
    } catch (error) {
        // Log the detailed error
        console.error("Error in chat API:", error);

        // Return a more helpful error message
        return new Response(
            JSON.stringify({
                error: "Failed to process your request",
                details: error instanceof Error ? error.message : "Unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}
