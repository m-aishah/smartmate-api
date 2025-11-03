const handleAPIError = require("~root/utils/handleAPIError");
const fetchUserChats = require("~root/actions/chats/fetchUserChats");
const getUserChatsSchema = require("./schemas/getUserChatsSchema");

const getUserChats = async (req, res) => {
  const { userId } = req.user;

  try {
    await getUserChatsSchema.validate({ userId }, { abortEarly: false });

    const chats = await fetchUserChats({ userId });

    return res.status(200).send({
      chats
    });
  } catch (err) {
    return handleAPIError(res, err);
  }
};

module.exports = getUserChats;
