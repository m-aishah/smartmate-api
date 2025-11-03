const uploadToS3 = require("~root/services/s3Uploader");
const parseSingleFile = require("./parseSingleFile");

const handleAudioLecture = async (req, res) => {
  await parseSingleFile(req, res);

  const { file } = req;

  if (!file) {
    return res.status(400).send({
      error: "Audio file is required for lectureType 'audio'"
    });
  }

  const uploadedLectureURL = await uploadToS3(file);
  return { uploadedLectureURL };
};

module.exports = handleAudioLecture;
