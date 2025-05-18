import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function GET() {
  try {
    // Check if the API key is defined
    if (!process.env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY is not defined in environment variables" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Test the Groq API with a simple prompt
    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: "Hello, are you working?",
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: "Groq API is working correctly",
        response: result.text.substring(0, 100) + "...",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("Error testing Groq API:", error)

    return new Response(
      JSON.stringify({
        error: "Failed to connect to Groq API",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
