const yup = require("yup");
const selectSystemPrompt = require("./queries/selectSystemPrompt");

const getSystemPromptByIdSchema = yup.object().shape({
  systemPromptId: yup
    .number()
    .required()
    .label("System Prompt ID")
    .typeError("System Prompt ID must be a number")
    .test("doesSystemPromptExist", "System Prompt must exist.", function test(
      systemPromptId
    ) {
      return selectSystemPrompt({
        systemPromptId
      }).then(systemPrompt => {
        if (systemPrompt) {
          return true;
        }
        return false;
      });
    })
});

module.exports = getSystemPromptByIdSchema;
