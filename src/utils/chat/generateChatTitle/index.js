const generateOpenRouterResponse = require("~root/services/openRouter/getOpenRouterResponse");
const { TITLE_GENERATION_PROMPT } = require("~root/constants/chatsConstants");
const constructNewMessage = require("../constructNewMessage");

// TODO: Better handle the generateChatTitle functionality
const generateChatTitle = async messages => {
  const promptMessage = constructNewMessage({
    role: "system",
    content: TITLE_GENERATION_PROMPT
  });
  const openRouterResponse = await generateOpenRouterResponse({
    messages: [promptMessage, ...messages]
  });

  if (openRouterResponse.success) {
    const { aiMessage } = openRouterResponse;
    const generatedChatTitle =
      aiMessage.length > 0 ? aiMessage : "Untitled Chat";
    return generatedChatTitle;
  }
  return "Untitled Chat"; // TODO: This should not be happening!
};

module.exports = generateChatTitle;
