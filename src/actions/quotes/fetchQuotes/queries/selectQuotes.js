const { submitQuery, camelKeys, sqlId } = require("~root/lib/database");

const selectQuotes = async ({ language }) => submitQuery`
    SELECT
      quote_id,
      ${sqlId(`${language}_quote`)} AS quote,
      author
    FROM quotes
`;

module.exports = camelKeys(selectQuotes);
