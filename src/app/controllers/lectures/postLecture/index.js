const createRecording = require("~root/actions/lectures/createRecording");
const createModelStackProcessorTask = require("~root/actions/modelStackProcessor/createModelStackProcessorTask");
const createSummary = require("~root/actions/lectures/createSummary");
const createLecture = require("~root/actions/lectures/createLecture");
const handleAudioLecture = require("~root/utils/handleAudioLecture");
const handleAPIError = require("~root/utils/handleAPIError");
const AudioProcessor = require("~root/services/audioProcessor");
const { PENDING } = require("~root/constants/status");
const postLectureSchema = require("./schemas/postLectureSchema");

const postLecture = async (req, res) => {
  const { userId } = req.user;
  const {
    courseCode,
    semester,
    yearOfStudy,
    lecture,
    lectureType,
    lectureTitle
  } = req.body;

  try {
    await postLectureSchema.validate(
      {
        userId,
        courseCode,
        semester,
        yearOfStudy,
        lecture,
        lectureType,
        lectureTitle
      },
      {
        abortEarly: false
      }
    );

    let recordingId = null;
    let result;

    if (lectureType === "audio") {
      // Upload file to S3
      const { uploadedLectureURL } = await handleAudioLecture(req, res);

      // Create recording record
      recordingId = await createRecording({
        courseCode,
        userId,
        recordingType: "audio",
        recordingFile: uploadedLectureURL
      });

      // Process audio through the pipeline
      result = await AudioProcessor.processFullPipeline({
        audioFileURL: uploadedLectureURL
      });
    } else if (lectureType === "text") {
      result = await AudioProcessor.summarizeText({ inputText: lecture });
    }

    await createModelStackProcessorTask({
      taskId: result.task_id,
      taskType: "summarization",
      status: result.status,
      message: result.message,
      statusUrl: result.check_status_url
    });

    const { summaryId } = await createSummary({
      courseCode,
      userId,
      summaryTitle: lectureTitle || PENDING,
      summaryDescription: PENDING,
      briefSummary: PENDING,
      detailedSummary: PENDING,
      keyPoints: PENDING,
      summarizationTaskId: result.task_id
    });

    const { lectureId } = await createLecture({
      courseCode,
      userId,
      lectureTitle: lectureTitle || PENDING,
      lectureDescription: PENDING,
      summaryId,
      recordingId
    });

    res.status(201).send({
      id: lectureId,
      taskId: result.task_id,
      taskStatus: result.status,
      taskMessage: result.message,
      taskStatusUrl: result.check_status_url
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = postLecture;
