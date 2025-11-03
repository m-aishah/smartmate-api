const handleAPIError = require("~root/utils/handleAPIError");
const removeDeadline = require("~root/actions/deadlines/removeDeadline");
const deleteDeadlineSchema = require("./schemas/deleteDeadlineSchema");

const deleteDeadline = async (req, res) => {
  const { deadlineId } = req.params;

  try {
    await deleteDeadlineSchema.validate(
      { deadlineId },
      {
        abortEarly: false
      }
    );

    const response = await removeDeadline({ deadlineId });

    res.status(204).send(response);
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = deleteDeadline;
