/* eslint-disable no-console */
const {
  DOCUMENT_SOURCE,
  DEFAULT_FILE_TYPE,
  DEFAULT_FILENAME,
  DEFAULT_MAX_RELEVANT_CHUNKS,
  DEFAULT_SIMILARITY_THRESHOLD
} = require("~root/constants/ragServiceConfigs");
const ragService = require("~root/services/ragService");
const { v4: uuidv4 } = require("uuid");

const processDocumentForRAG = async ({ documentURL, userId, userQuery }) => {
  try {
    const documentId = `doc_${uuidv4()}`;

    const filename = documentURL.split("/").pop() || DEFAULT_FILENAME;
    const fileType = (
      filename.split(".").pop() || DEFAULT_FILE_TYPE
    ).toLowerCase();

    console.log(`Processing document: ${filename} for user: ${userId}`);

    // Process document and wait for completion
    const { completedStatus } = await ragService.processDocumentAndWait({
      fileUrl: documentURL,
      documentId,
      userId,
      filename,
      fileType,
      metadata: { source: DOCUMENT_SOURCE, timestamp: new Date().toISOString() }
    });

    console.log(
      `Document processed successfully: ${completedStatus.total_chunks} chunks created`
    );

    // Search for relevant chunks based on user query
    const searchResults = await ragService.semanticSearch({
      query: userQuery,
      userId,
      topK: DEFAULT_MAX_RELEVANT_CHUNKS,
      similarityThreshold: DEFAULT_SIMILARITY_THRESHOLD,
      documentIds: [documentId]
    });

    return {
      documentId,
      documentInfo: completedStatus,
      relevantChunks: searchResults.relevant_chunks || []
    };
  } catch (error) {
    console.error("RAG processing error:", error);
    throw new Error(`Failed to process document: ${error.message}`);
  }
};

module.exports = processDocumentForRAG;
