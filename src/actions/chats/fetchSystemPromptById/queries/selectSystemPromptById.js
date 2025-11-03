const { submitQuery, camelKeys } = require("~root/lib/database");

const selectSystemPrompt = ({ systemPromptId }) => submitQuery`
    SELECT
        system_prompt_id,
        prompt_name,
        prompt_description,
        prompt,
        created_at,
        updated_at
    FROM
        system_prompts
    WHERE
        system_prompt_id = ${systemPromptId};
`;

module.exports = camelKeys(selectSystemPrompt);
