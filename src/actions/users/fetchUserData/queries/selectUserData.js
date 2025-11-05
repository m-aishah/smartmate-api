const { camelKeys, getFirst, submitQuery } = require("~root/lib/database");

const selectUserData = ({ userId }) => submitQuery`
    SELECT
        users.user_id,
        first_name,
        last_name,
        email,
        student_number,
        university,
        year_of_study,
        current_semester AS semester,
        language_preference,
        streak,
        total_hours_studied
    FROM
        users
    LEFT JOIN user_analytics ON users.user_id = user_analytics.user_id
    WHERE
         users.user_id = ${userId}
`;

module.exports = getFirst(camelKeys(selectUserData));
