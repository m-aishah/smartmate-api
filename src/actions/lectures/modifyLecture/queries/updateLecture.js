const {
  submitQuery,
  sql,
  sqlReduce,
  sqlValueOrNull
} = require("~root/lib/database");

const NO_UPDATE = Symbol("NO_UPDATE");

const updateLecture = ({
  lectureId,
  userId,
  lectureTitle = NO_UPDATE,
  lectureDescription = NO_UPDATE,
  isFavourite = NO_UPDATE,
  isArchived = NO_UPDATE,
  isDeleted = NO_UPDATE,
  isPinned = NO_UPDATE
}) => {
  const updates = [];

  if (lectureTitle !== NO_UPDATE) {
    updates.push(sql`lecture_title = ${sqlValueOrNull(lectureTitle)}`);
  }

  if (lectureDescription !== NO_UPDATE) {
    updates.push(
      sql`lecture_description = ${sqlValueOrNull(lectureDescription)}`
    );
  }

  if (isFavourite !== NO_UPDATE) {
    updates.push(sql`is_favourite = ${sqlValueOrNull(isFavourite)}`);
  }

  if (isArchived !== NO_UPDATE) {
    updates.push(sql`is_archived = ${sqlValueOrNull(isArchived)}`);
  }

  if (isDeleted !== NO_UPDATE) {
    updates.push(sql`is_deleted = ${sqlValueOrNull(isDeleted)}`);
  }

  if (isPinned !== NO_UPDATE) {
    updates.push(sql`is_pinned = ${sqlValueOrNull(isPinned)}`);
  }

  if (updates.length !== 0) {
    updates.push(sql`updated_at = NOW()`);

    return submitQuery`
            UPDATE
                lectures
            SET
                ${updates.reduce(sqlReduce)}
            WHERE
                lecture_id = ${lectureId} AND created_by = ${userId}`;
  }

  return Promise.resolve();
};

module.exports = updateLecture;
