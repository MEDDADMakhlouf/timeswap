"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, X, Send, Loader2, ThumbsUp, ThumbsDown, HelpCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Types for feedback
type FeedbackType = "positive" | "negative" | null
type MessageFeedback = Record<string, FeedbackType>

// Suggested questions to help users get started
const suggestedQuestions = [
  "How does the swap request system work?",
  "What features does TimeSwap offer?",
  "Is there a mobile app available?",
  "How secure is my scheduling data?",
]

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [typingIndicator, setTypingIndicator] = useState(false)
  const [feedback, setFeedback] = useState<MessageFeedback>({})
  const [feedbackLoading, setFeedbackLoading] = useState<Record<string, boolean>>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, setInput } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "👋 Hi there! I'm the TimeSwap assistant. How can I help you with scheduling today?",
      },
    ],
    onResponse: () => {
      // Show typing indicator when response starts
      setTypingIndicator(true)

      // Clear any previous errors
      setErrorMessage(null)

      // Reset retry count on successful response
      setRetryCount(0)
    },
    onFinish: () => {
      // Hide typing indicator when response finishes
      setTimeout(() => {
        setTypingIndicator(false)
      }, 500)
    },
    onError: (error) => {
      console.error("Chat error:", error)
      setErrorMessage(
        error.message === "Internal server error"
          ? "I'm having trouble connecting to my knowledge base. Please try again in a moment."
          : error.message || "Something went wrong with the chat. Please try again.",
      )
      setTypingIndicator(false)
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, typingIndicator, errorMessage])

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Set mounted to true on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      // Clear any previous errors
      setErrorMessage(null)
      handleSubmit(e)
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) form.requestSubmit()
    }
  }

  // Handle feedback submission
  const submitFeedback = async (messageId: string, type: FeedbackType) => {
    // Don't allow changing feedback once submitted
    if (feedback[messageId]) return

    // Set loading state
    setFeedbackLoading((prev) => ({ ...prev, [messageId]: true }))

    try {
      // Submit feedback to API
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, type, content: messages.find((m) => m.id === messageId)?.content }),
      })

      // Update local state
      setFeedback((prev) => ({ ...prev, [messageId]: type }))
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setFeedbackLoading((prev) => ({ ...prev, [messageId]: false }))
    }
  }

  // Handle retry
  const handleRetry = () => {
    setErrorMessage(null)
    setRetryCount((prev) => prev + 1)

    // If we've tried too many times, suggest using suggested questions
    if (retryCount >= 2) {
      setErrorMessage("I'm still having trouble. Try one of the suggested questions below.")
      return
    }

    if (messages.length > 1) {
      reload()
    }
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    // Focus the input after setting the question
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 w-80 sm:w-96"
          >
            <div className="rounded-xl border bg-white shadow-xl overflow-hidden">
              {/* Header with gradient background matching the landing page */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="font-medium">TimeSwap Assistant</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-full text-white hover:bg-blue-500/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat messages area */}
              <div className="flex flex-col  overflow-auto h-100 p-4 ">

                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="group relative">
                      <div
                        className={cn(
                          "flex w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm hover:scale-105 transition-transform ease-in duration-[5s]",
                          message.role === "user"
                            ? "ml-auto bg-blue-600 text-white rounded-tr-none"
                            : "bg-gray-100 text-gray-900 rounded-tl-none",
                        )}
                      >
                        {message.content}
                      </div>

                      {/* Feedback buttons - only show for assistant messages */}
                      {message.role === "assistant" && message.id !== "welcome-message" && (
                        <div
                          className={cn(
                            "mt-1 flex items-center gap-1 transition-opacity",
                            feedback[message.id] ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                          )}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "h-6 w-6 rounded-full",
                                    feedback[message.id] === "positive"
                                      ? "text-green-500"
                                      : "text-gray-400 hover:text-green-500",
                                  )}
                                  onClick={() => submitFeedback(message.id, "positive")}
                                  disabled={!!feedback[message.id] || feedbackLoading[message.id]}
                                >
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p className="text-xs">This was helpful</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "h-6 w-6 rounded-full",
                                    feedback[message.id] === "negative"
                                      ? "text-red-500"
                                      : "text-gray-400 hover:text-red-500",
                                  )}
                                  onClick={() => submitFeedback(message.id, "negative")}
                                  disabled={!!feedback[message.id] || feedbackLoading[message.id]}
                                >
                                  <ThumbsDown className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p className="text-xs">This wasn't helpful</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {feedbackLoading[message.id] && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />
                          )}

                          {feedback[message.id] && (
                            <span className="text-xs text-gray-500">
                              {feedback[message.id] === "positive"
                                ? "Thanks for your feedback!"
                                : "Thanks for letting us know"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {typingIndicator && (
                    <div className="bg-gray-100 text-gray-900 w-max max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm rounded-tl-none">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <motion.div
                            className="h-2 w-2 rounded-full bg-blue-500"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2 }}
                          />
                          <motion.div
                            className="h-2 w-2 rounded-full bg-blue-500"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.3, delay: 0.1 }}
                          />
                          <motion.div
                            className="h-2 w-2 rounded-full bg-blue-500"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.4, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {(error || errorMessage) && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs flex items-center justify-between w-full">
                        <span>{errorMessage || "Sorry, there was an error. Please try again."}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRetry}
                          className="ml-2 h-7 text-xs border-red-300 hover:bg-red-100"
                        >
                          Retry
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Suggested questions - show when there's an error after multiple retries */}
                  {retryCount >= 2 && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Try one of these questions instead:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs border-blue-200 hover:bg-blue-50 text-blue-700"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input area */}
              <div className="border-t p-4 bg-gray-50">
                <form onSubmit={onSubmit} className="flex gap-2">
                  <Textarea
                    ref={inputRef}
                    placeholder="Ask a question..."
                    className="min-h-10 flex-1 resize-none border-blue-200 focus-visible:ring-blue-500"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="h-10 w-10 shrink-0 bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>

                {/* Help text and powered by */}
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" />
                    <span>Ask about features, pricing, or support</span>
                  </div>
                  <div>Powered by Groq</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button */}
      <Button
        size="lg"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-colors",
          open
            ? "bg-gradient-to-r from-blue-700 to-blue-600"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
        )}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  )
}
