const BASE_URL = process.env.RAG_SERVICE_BASE_URL || "http://127.0.0.1:8000";

const RAG_SERVICE_ENDPOINTS = {
  PROCESS_DOCUMENT: `${BASE_URL}/documents/process`,
  GET_DOCUMENT_STATUS: documentId =>
    `${BASE_URL}/documents/status/${documentId}`,
  LIST_DOCUMENTS: `${BASE_URL}/documents/list`,
  DELETE_DOCUMENT: documentId => `${BASE_URL}/documents/${documentId}`,

  SEMANTIC_SEARCH: `${BASE_URL}/query/search`,
  FIND_SIMILAR_CHUNKS: chunkId => `${BASE_URL}/query/similar/${chunkId}`,
  BATCH_SEARCH: `${BASE_URL}/query/batch-search`,
  GET_STATS: `${BASE_URL}/query/stats`,

  HEALTH_CHECK: `${BASE_URL}/health`,
  GET_METRICS: `${BASE_URL}/metrics`
};

module.exports = RAG_SERVICE_ENDPOINTS;
