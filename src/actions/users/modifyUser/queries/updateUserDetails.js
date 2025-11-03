const {
  submitQuery,
  sql,
  sqlReduce,
  sqlValueOrNull
} = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateUserDetails = ({
  userId,
  firstName = NO_UPDATE,
  lastName = NO_UPDATE,
  password = NO_UPDATE,
  studentNumber = NO_UPDATE,
  university = NO_UPDATE,
  yearOfStudy = NO_UPDATE,
  currentSemester = NO_UPDATE,
  langugaePreference = NO_UPDATE
}) => {
  const updates = [];

  if (firstName !== NO_UPDATE) {
    updates.push(sql`first_name = ${sqlValueOrNull(firstName)}`);
  }

  if (lastName !== NO_UPDATE) {
    updates.push(sql`last_name = ${sqlValueOrNull(lastName)}`);
  }

  if (password !== NO_UPDATE) {
    updates.push(sql`password = ${sqlValueOrNull(password)}`);
  }

  if (studentNumber !== NO_UPDATE) {
    updates.push(sql`student_number = ${sqlValueOrNull(studentNumber)}`);
  }

  if (university !== NO_UPDATE) {
    updates.push(sql`university = ${sqlValueOrNull(university)}`);
  }

  if (yearOfStudy !== NO_UPDATE) {
    updates.push(sql`year_of_study = ${sqlValueOrNull(yearOfStudy)}`);
  }

  if (currentSemester !== NO_UPDATE) {
    updates.push(sql`current_semester = ${sqlValueOrNull(currentSemester)}`);
  }

  if (langugaePreference !== NO_UPDATE) {
    updates.push(
      sql`language_preference = ${sqlValueOrNull(langugaePreference)}`
    );
  }

  if (updates.length !== 0) {
    updates.push(sql`updated_at = NOW()`);

    return submitQuery`
            UPDATE
                users
            SET
                ${updates.reduce(sqlReduce)}
            WHERE
                user_id = ${userId}`;
  }

  return Promise.resolve();
};

module.exports = updateUserDetails;
