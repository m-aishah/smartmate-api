const selectSystemPrompt = require("./queries/selectSystemPromptById");

const fetchSystemPromptById = async ({ systemPromptId }) => {
  const systemPrompt = await selectSystemPrompt({
    systemPromptId
  });
  return systemPrompt;
};

module.exports = fetchSystemPromptById;
