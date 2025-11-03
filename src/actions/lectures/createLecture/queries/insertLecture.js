const { submitQuery, getInsertId } = require("~root/lib/database");

const insertLecture = ({
  courseId,
  userId,
  lectureTitle,
  lectureDescription,
  summaryId,
  recordingId
}) => submitQuery`

    INSERT INTO lectures
    (
        course_id,
        created_by,
        lecture_title,
        lecture_description,
        summary_id,
        recording_id
    )
    VALUES
    (
        ${courseId},
        ${userId},
        ${lectureTitle},
        ${lectureDescription},
        ${summaryId},
        ${recordingId}
    )
`;

module.exports = getInsertId(insertLecture);
