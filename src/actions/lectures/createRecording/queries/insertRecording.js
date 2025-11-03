const { submitQuery, getInsertId } = require("~root/lib/database");

const insertRecording = ({
  courseId,
  userId,
  recordingType,
  recordingMicrosoftTeamsUrl,
  recordingFile
}) => submitQuery`

    INSERT INTO recordings
    (
        course_id,
        created_by,
        recording_type,
        recording_microsoft_teams_url,
        recording_file
    )
    VALUES
    (
        ${courseId},
        ${userId},
        ${recordingType},
        ${recordingMicrosoftTeamsUrl},
        ${recordingFile}
    )
`;

module.exports = getInsertId(insertRecording);
