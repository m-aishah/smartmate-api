const BASE_URL = process.env.LECTURE_PROCESSOR_API || "https://cschatbot.me";

module.exports = {
  TRANSCRIBE_AUDIO: `${BASE_URL}/transcribe/audio/file`,
  SUMMARIZE_TEXT: `${BASE_URL}/summarize/text/`,
  TRANSLATE_TEXT: `${BASE_URL}/translate/text/`,
  PROCESS_PIPELINE: `${BASE_URL}/audio/file`,
  GET_STATUS: taskId => `${BASE_URL}/status/${taskId}`
};
