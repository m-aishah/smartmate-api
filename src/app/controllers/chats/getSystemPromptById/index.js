const handleAPIError = require("~root/utils/handleAPIError");
const fetchSystemPromptById = require("~root/actions/chats/fetchSystemPromptById");
const getSystemPromptByIdSchema = require("./schemas/getSystemPromptByIdSchema");

const getSystemPromptById = async (req, res) => {
  const { systemPromptId } = req.params;
  try {
    await getSystemPromptByIdSchema.validate(
      { systemPromptId },
      { abortEarly: false }
    );
    const systemPrompt = await fetchSystemPromptById({ systemPromptId });
    return res.status(200).send({
      systemPrompt
    });
  } catch (err) {
    return handleAPIError(res, err);
  }
};

module.exports = getSystemPromptById;
