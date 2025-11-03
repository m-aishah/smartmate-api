const handleAPIError = require("~root/utils/handleAPIError");
const fetchQuotes = require("~root/actions/quotes/fetchQuotes");

const getQuotes = async (req, res) => {
  const { language } = req.params;

  try {
    const { quotes } = await fetchQuotes({ language });

    res.status(200).send({
      success: true,
      quotes
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = getQuotes;
