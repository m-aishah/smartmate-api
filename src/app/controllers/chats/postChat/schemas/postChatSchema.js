const yup = require("yup");

const postChatSchema = yup.object().shape({
  userId: yup
    .number()
    .label("User ID")
    .required("UserID is required")
    .typeError("UserID must be a number"),
  chatId: yup
    .number()
    .label("Chat Id")
    .typeError("Chat ID must be a number"),
  chatTitle: yup.string().label("Chat Title"),
  messages: yup.array().label("Messages"),
  systemPromptId: yup.number().label("System Prompt"),
  documentURL: yup
    .string()
    .label("Document URL")
    .url("Document URL must be a valid URL")
    .optional()
    .typeError("Document URL must be a string")
});

module.exports = postChatSchema;
