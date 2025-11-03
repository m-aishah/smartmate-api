const selectQuotes = require("./queries/selectQuotes");

const fetchQuotes = async ({ language = "en" }) => {
  const quotes = await selectQuotes({ language });

  return {
    quotes
  };
};

module.exports = fetchQuotes;
