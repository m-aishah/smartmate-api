const endpoints = require("~root/constants/ragServiceEndpoints");
const apiClient = require("~root/utils/apiClient");

const RagService = {
  // Document Processing Methods
  async processDocument({
    fileUrl,
    documentId,
    userId,
    filename,
    fileType,
    metadata = {}
  }) {
    const response = await apiClient.post(endpoints.PROCESS_DOCUMENT, {
      file_url: fileUrl,
      document_id: documentId,
      user_id: userId,
      filename,
      file_type: fileType,
      metadata
    });

    return response.data;
  },

  async getDocumentStatus({ documentId, userId }) {
    const response = await apiClient.get(
      endpoints.GET_DOCUMENT_STATUS(documentId),
      {
        params: { user_id: userId }
      }
    );
    return response.data;
  },

  async listUserDocuments({ userId, status = null, limit = 10, offset = 0 }) {
    const params = {
      user_id: userId,
      limit,
      offset
    };

    if (status) {
      params.status = status;
    }

    const response = await apiClient.get(endpoints.LIST_DOCUMENTS, {
      params
    });

    return response.data;
  },

  async deleteDocument({ documentId, userId }) {
    const response = await apiClient.delete(
      endpoints.DELETE_DOCUMENT(documentId),
      {
        params: { user_id: userId }
      }
    );
    return response.data;
  },

  // Query & Search Methods
  async semanticSearch({
    query,
    userId,
    topK = 5,
    similarityThreshold = 0.3,
    documentIds = null
  }) {
    const requestBody = {
      query,
      user_id: userId,
      top_k: topK,
      similarity_threshold: similarityThreshold
    };

    if (documentIds && documentIds.length > 0) {
      requestBody.document_ids = documentIds;
    }

    const response = await apiClient.post(
      endpoints.SEMANTIC_SEARCH,
      requestBody
    );
    return response.data;
  },

  async findSimilarChunks({ chunkId, userId, topK = 5 }) {
    const response = await apiClient.get(
      endpoints.FIND_SIMILAR_CHUNKS(chunkId),
      {
        params: {
          user_id: userId,
          top_k: topK
        }
      }
    );
    return response.data;
  },

  async batchSearch({ queries, userId, topK = 3 }) {
    const response = await apiClient.post(endpoints.BATCH_SEARCH, {
      queries,
      user_id: userId,
      top_k: topK
    });
    return response.data;
  },

  async getUserStats({ userId }) {
    const response = await apiClient.get(endpoints.GET_STATS, {
      params: { user_id: userId }
    });
    return response.data;
  },

  // Health & Monitoring Methods
  async healthCheck() {
    const response = await apiClient.get(endpoints.HEALTH_CHECK);
    return response.data;
  },

  async getMetrics() {
    const response = await apiClient.get(endpoints.GET_METRICS);
    return response.data;
  },

  // Utility Methods
  async waitForDocumentProcessing({
    documentId,
    userId,
    maxWaitTime = 300000,
    pollInterval = 5000
  }) {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getDocumentStatus({ documentId, userId });

      if (status.status === "completed") {
        return status;
      }
      if (status.status === "failed") {
        throw new Error(
          `Document processing failed for document ${documentId}`
        );
      }

      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Document processing timed out for document ${documentId}`);
  },

  async processDocumentAndWait({
    fileUrl,
    documentId,
    userId,
    filename,
    fileType,
    metadata = {},
    maxWaitTime = 300000,
    pollInterval = 5000
  }) {
    // Start processing
    const processResult = await this.processDocument({
      fileUrl,
      documentId,
      userId,
      filename,
      fileType,
      metadata
    });

    // Wait for completion
    const completedStatus = await this.waitForDocumentProcessing({
      documentId,
      userId,
      maxWaitTime,
      pollInterval
    });

    return {
      processResult,
      completedStatus
    };
  }
};

module.exports = RagService;
