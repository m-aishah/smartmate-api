const { submitQuery, camelKeys } = require("~root/lib/database/index");

const selectUserQuizzes = async ({ userId }) => submitQuery`
    SELECT
        quiz_id AS id,
        quiz_title AS title,
        questions,
        quizzes.created_at,
        quizzes.lecture_id AS lecture,
        lectures.lecture_title AS lectureTitle
    FROM
        quizzes, lectures
    WHERE
        quizzes.created_by = ${userId}
        AND quizzes.lecture_id = lectures.lecture_id
    ORDER BY
        quizzes.created_at DESC;
    `;

module.exports = camelKeys(selectUserQuizzes);
