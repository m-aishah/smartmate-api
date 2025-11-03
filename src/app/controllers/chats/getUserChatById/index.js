const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserChatById = require("~root/actions/chats/fetchUserChatById");
const getUserChatByIdSchema = require("./schemas/getUserChatByIdSchema");

const getUserChatById = async (req, res) => {
  const { chatId } = req.params;

  try {
    await getUserChatByIdSchema.validate({ chatId }, { abortEarly: false });

    const { chat } = await fetchUserChatById({
      chatId
    });

    return res.status(200).send({
      chat
    });
  } catch (err) {
    return handleAPIError(res, err);
  }
};

module.exports = getUserChatById;
