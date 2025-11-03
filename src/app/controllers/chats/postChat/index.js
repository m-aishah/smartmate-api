const handleAPIError = require("~root/utils/handleAPIError");
const generateChatTitle = require("~root/utils/chat/generateChatTitle");
const {
  DEFAULT_PROMPT_ID,
  MINIMUM_MESSAGE_COUNT_TO_GENERATE_TITLE
} = require("~root/constants/chatsConstants");
const chat = require("~root/utils/chat");
const createChat = require("~root/actions/chats/createChat");
const modifyChat = require("~root/actions/chats/modifyChat");
const postChatSchema = require("./schemas/postChatSchema");

const createOrUpdateChat = async ({
  chatId,
  chatTitle,
  messages,
  systemPromptId = DEFAULT_PROMPT_ID,
  userId
}) => {
  let generatedChatTitle = chatTitle;

  if (messages.length < MINIMUM_MESSAGE_COUNT_TO_GENERATE_TITLE || !chatId) {
    generatedChatTitle = await generateChatTitle(messages);
  }

  if (chatId) {
    const finalChatId = await modifyChat({
      chatId,
      chatTitle: generatedChatTitle,
      messages,
      systemPromptId
    });
    return { finalChatId };
  }

  const { newChatId } = await createChat({
    chatTitle: generatedChatTitle,
    messages,
    systemPromptId,
    userId
  });

  return { finalChatId: newChatId };
};

const postChat = async (req, res) => {
  const { userId } = req.user;
  const {
    chatTitle,
    messages,
    systemPromptId,
    chatId,
    documentURL,
    // eslint-disable-next-line no-unused-vars
    selectedSummary
  } = req.body;

  try {
    postChatSchema.validate(
      { userId, chatId, chatTitle, messages, systemPromptId, documentURL },
      { abortEarly: false }
    );

    const { updatedMessages, assistantMessage, ragContext } = await chat({
      chatTitle,
      messages,
      systemPromptId,
      documentURL,
      userId
    });

    const { finalChatId } = await createOrUpdateChat({
      chatId,
      chatTitle,
      messages: updatedMessages,
      systemPromptId,
      userId
    });

    const response = {
      id: finalChatId,
      title: chatTitle,
      messages: updatedMessages,
      aiReply: assistantMessage
    };

    if (ragContext) {
      response.ragInfo = {
        documentProcessed: true,
        documentId: ragContext.documentId,
        documentName: ragContext.documentInfo.filename,
        chunksFound: ragContext.relevantChunks.length,
        totalChunks: ragContext.documentInfo.total_chunks
      };
    }

    res.status(201).json(response);
  } catch (error) {
    handleAPIError(res, error);
  }
}; // TODO: Update method of sending data to SSE

module.exports = postChat;
