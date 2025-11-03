/* eslint-disable no-console */
const { DEFAULT_PROMPT } = require("~root/constants/chatsConstants");

const constructNewMessage = require("~root/utils/chat/constructNewMessage");
const generateOpenRouterResponse = require("~root/services/openRouter/getOpenRouterResponse");

const processDocumentForRAG = require("./processDocumentForRAG");
const buildContextualPrompt = require("./buildContextualPrompt");

// TODO:
// STop using default System Prompt - get the approprate prompt by ID
// Using streaming functionality in openrouter -> https://openrouter.ai/docs/api-reference/streaming
// Implement the streaming functionality in the chat function
// replace the function header with:
// const chat = async ({ conversationTitle, messages, systemPromptId }) => {

const chat = async ({ messages, documentURL = null, userId = null }) => {
  let enhancedPrompt = DEFAULT_PROMPT;
  let ragContext = null;

  // If document URL is provided, process it with RAG
  if (documentURL && userId) {
    try {
      // Get the user's latest message to use as search query
      const userMessages = messages.filter(msg => msg.role === "user");
      const latestUserMessage = userMessages[userMessages.length - 1];

      if (latestUserMessage) {
        ragContext = await processDocumentForRAG({
          documentURL,
          userId: String(userId),
          userQuery: latestUserMessage.content
        });

        // Enhance the system prompt with document context
        enhancedPrompt = buildContextualPrompt({
          originalPrompt: DEFAULT_PROMPT,
          relevantChunks: ragContext.relevantChunks,
          documentInfo: ragContext.documentInfo
        });
      }
    } catch (error) {
      console.error(
        "RAG integration failed, continuing without context:",
        error.message
      );
    }
  }

  const promptMessage = constructNewMessage({
    role: "system",
    content: enhancedPrompt
  });

  const openRouterResponse = await generateOpenRouterResponse({
    messages: [promptMessage, ...messages]
  });

  if (openRouterResponse.success) {
    const assistantMessage = constructNewMessage({
      role: "assistant",
      content: openRouterResponse.aiMessage
    });

    // Add RAG metadata if available
    if (ragContext) {
      assistantMessage.ragContext = {
        documentId: ragContext.documentId,
        documentName: ragContext.documentInfo.filename,
        chunksUsed: ragContext.relevantChunks.length,
        averageSimilarity:
          ragContext.relevantChunks.length > 0
            ? ragContext.relevantChunks.reduce(
                (sum, chunk) => sum + chunk.similarity_score,
                0
              ) / ragContext.relevantChunks.length
            : 0
      };
    }

    const updatedMessages = [...messages, assistantMessage];
    return { updatedMessages, assistantMessage };
  }

  // Handle credit-related errors gracefully without throwing
  if (openRouterResponse.error) {
    const { error } = openRouterResponse;
    const errorCode = error.code || error.status;
    const errorMessage = error.message || error.error || "Unknown error";

    let userFriendlyMessage =
      "⚠️ Sorry, I'm having trouble responding right now. Please try again later.";

    // Check for various credit/rate limit related error codes and messages
    if (
      errorCode === 429 ||
      errorCode === 402 ||
      errorCode === "insufficient_quota" ||
      errorMessage.toLowerCase().includes("rate limit") ||
      errorMessage.toLowerCase().includes("quota") ||
      errorMessage.toLowerCase().includes("credit") ||
      errorMessage.toLowerCase().includes("billing") ||
      errorMessage.toLowerCase().includes("insufficient")
    ) {
      userFriendlyMessage =
        "🚫 I've reached my usage limit. Please wait a moment or add credits to continue using SmartMate Chat.";
    }

    console.error("OpenRouter API Error:", {
      code: errorCode,
      message: errorMessage,
      fullError: error
    });

    const errorAssistantMessage = constructNewMessage({
      role: "assistant",
      content: userFriendlyMessage
    });

    const updatedMessages = [...messages, errorAssistantMessage];
    return { updatedMessages, assistantMessage: errorAssistantMessage };
  }

  // If we get here, something unexpected happened, but still don't throw
  console.error("Unexpected chat error - no success and no error object");

  const fallbackMessage = constructNewMessage({
    role: "assistant",
    content:
      "⚠️ I encountered an unexpected issue. Please try sending your message again."
  });

  const updatedMessages = [...messages, fallbackMessage];
  return { updatedMessages, assistantMessage: fallbackMessage };
};

module.exports = chat;
