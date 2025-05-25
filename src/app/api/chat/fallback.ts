import { createDataStreamResponse } from "ai";

// This is a simple fallback response generator that doesn't rely on external APIs
export function generateFallbackResponse(userMessage: string) {
    // Extract keywords from user message
    const message = userMessage.toLowerCase();

    // Simple pattern matching for common questions
    if (message.includes("schedule") || message.includes("timetable")) {
        return "TimeSwap helps you manage your schedule with our intuitive timetable interface. You can view your current schedule and identify potential swap opportunities easily.";
    }

    if (message.includes("swap") || message.includes("exchange")) {
        return "With TimeSwap, you can easily request schedule swaps with other users. Once approved, your schedule is automatically updated in the system.";
    }

    if (message.includes("notification") || message.includes("alert")) {
        return "TimeSwap provides real-time notifications for schedule changes and swap requests, so you're always up to date.";
    }

    if (message.includes("price") || message.includes("cost") || message.includes("plan")) {
        return "TimeSwap offers several pricing plans to meet your needs, from a free Basic plan for individuals to Enterprise plans for institutions. Each plan includes different features and levels of support.";
    }

    if (message.includes("mobile") || message.includes("app")) {
        return "Yes, TimeSwap is available on both iOS and Android. The mobile app includes all the features of the web version, allowing you to manage your schedule on the go.";
    }

    if (message.includes("security") || message.includes("secure") || message.includes("privacy")) {
        return "We take security seriously at TimeSwap. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits to ensure your information remains protected.";
    }

    // Default response if no patterns match
    return "I'm here to help with questions about TimeSwap's scheduling features, swap requests, notifications, and more. How can I assist you today?";
}

// Create a fallback response stream
export function createFallbackStream(userMessage: string) {
    const response = generateFallbackResponse(userMessage);

    return createDataStreamResponse({
        async execute(dataStream) {
            // Simulate typing by sending the response character by character
            const chars = response.split("");

            // Send initial message part
            await dataStream.write({
                type: "message-part",
                data: {
                    type: "text",
                    text: "",
                },
            } as any);

            // Send characters with delays to simulate typing
            for (const char of chars) {
                await new Promise((resolve) => setTimeout(resolve, 20)); // 20ms delay per character

                await dataStream.write({
                    type: "message-part",
                    data: {
                        type: "text",
                        text: char,
                    },
                } as any);
            }

            // Send final message
            await dataStream.write({
                type: "message",
                data: {
                    role: "assistant",
                    content: response,
                    id: `fallback-${Date.now()}`,
                },
            } as any);
        },
    });
}
