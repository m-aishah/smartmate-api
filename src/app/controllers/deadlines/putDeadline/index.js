const handleAPIError = require("~root/utils/handleAPIError");
const modifyDeadline = require("~root/actions/deadlines/modifyDeadline");
const putDeadlineSchema = require("./schemas/putDeadlineSchema");

const putDeadline = async (req, res) => {
  const { userId } = req.user;
  const { deadlineId } = req.params;
  const { title, date } = req.body;

  try {
    await putDeadlineSchema.validate(
      {
        title,
        date
      },
      {
        abortEarly: false
      }
    );

    const updatedDeadline = await modifyDeadline({
      deadlineId,
      userId,
      title,
      date
    });

    res.status(201).send({
      success: true,
      message: "Deadline updated successfully",
      deadline: updatedDeadline
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = putDeadline;
