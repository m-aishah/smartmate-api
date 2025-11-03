const extractCourseCodeAndName = require("~root/utils/extractCourseCodeAndName");
const handleAPIError = require("~root/utils/handleAPIError");
const createDeadline = require("~root/actions/deadlines/createDeadline");
const postDeadlineSchema = require("./schemas/postDeadlineSchema");

const postDeadline = async (req, res) => {
  const { userId } = req.user;
  const { title, date, course } = req.body;

  try {
    await postDeadlineSchema.validate(
      {
        userId,
        title,
        date,
        course
      },
      {
        abortEarly: false
      }
    );

    const { courseCode, courseName } = extractCourseCodeAndName({ course });

    const { deadlineId } = await createDeadline({
      userId,
      title,
      date,
      courseCode,
      courseName
    });

    res.status(201).send({
      id: deadlineId
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = postDeadline;
