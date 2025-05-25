export async function POST(req: Request) {
    try {
        const { messageId, type, content } = await req.json();

        // Log the feedback (in a real app, you'd store this in a database)
        console.log(`Feedback received - ID: ${messageId}, Type: ${type}, Content: ${content}`);

        // Here you would typically store the feedback in a database
        // For now, we'll just return a success response

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing feedback:", error);
        return new Response(JSON.stringify({ error: "Failed to process feedback" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
