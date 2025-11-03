const yup = require("yup");
const selectUserChatById = require("./queries/selectUserChatById");

const getUserChatByIdSchema = yup.object().shape({
  chatId: yup
    .number()
    .required("Chat ID is required")
    .label("Chat ID")
    .typeError("chatId must be a number")
    .test("DoesChatExist", "The chat does not exist", async function test(
      chatId
    ) {
      const isChat = await selectUserChatById({
        chatId
      });
      if (isChat) return true;

      return false;
    })
});

module.exports = getUserChatByIdSchema;
