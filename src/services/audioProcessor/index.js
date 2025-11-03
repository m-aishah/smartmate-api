const endpoints = require("~root/constants/lectureProcessorEndpoints");
const {
  TRANSCRIPTION_MODE,
  SUMMARIZATION_MODE
} = require("~root/constants/lectureProcessorConfig");
// eslint-disable-next-line no-unused-vars
const { ENGLISH, TURKISH } = require("~root/constants/languages");
const apiClient = require("~root/utils/apiClient");

const AudioProcessor = {
  async transcribeAudio({
    audioFileURL,
    transcriptionMode = TRANSCRIPTION_MODE.ASSEMBLY
  }) {
    const response = await apiClient.post(endpoints.TRANSCRIBE_AUDIO, {
      transcription_mode: transcriptionMode,
      audio_file_url: audioFileURL
    });

    return response.data;
  },

  async summarizeText({
    inputText,
    summarizationMode = SUMMARIZATION_MODE.GPT
  }) {
    const response = await apiClient.post(endpoints.SUMMARIZE_TEXT, {
      text: inputText,
      summarization_mode: summarizationMode
    });
    return response.data;
  },

  async translateText({ text, targetLanguage = ENGLISH }) {
    const form = new URLSearchParams();
    form.append("text", text);
    form.append("target_language", targetLanguage);

    const response = await apiClient.post(endpoints.TRANSLATE_TEXT, form);
    return response.data;
  },

  async processFullPipeline({
    audioFileURL,
    transcriptionMode = TRANSCRIPTION_MODE.ASSEMBLY,
    summarizationMode = SUMMARIZATION_MODE.GPT,
    targetLanguage = ENGLISH
  }) {
    const response = await apiClient.post(endpoints.PROCESS_PIPELINE, {
      audio_file_url: audioFileURL,
      transcription_mode: transcriptionMode,
      summarization_mode: summarizationMode,
      target_language: targetLanguage
    });

    return response.data;
  },

  async getTaskStatus({ taskId }) {
    const response = await apiClient.get(endpoints.GET_STATUS(taskId));
    return response.data;
  }
};

module.exports = AudioProcessor;
