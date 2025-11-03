const updateLecture = require("./queries/updateLecture");

const modifyLecture = async ({
  lectureId,
  userId,
  lectureTitle,
  lectureDescription,
  isFavourite,
  isArchived,
  isDeleted,
  isPinned
}) => {
  const updatedLecture = await updateLecture({
    lectureId,
    userId,
    lectureTitle,
    lectureDescription,
    isFavourite,
    isArchived,
    isDeleted,
    isPinned
  });

  return { updatedLecture };
};

module.exports = modifyLecture;
