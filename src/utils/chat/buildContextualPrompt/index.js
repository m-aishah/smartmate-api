const buildContextualPrompt = ({
  originalPrompt,
  relevantChunks,
  documentInfo
}) => {
  if (!relevantChunks || relevantChunks.length === 0) {
    return originalPrompt;
  }

  const contextualInfo = relevantChunks
    .map(
      (chunk, index) =>
        `[Context ${index + 1}] (Similarity: ${chunk.similarity_score.toFixed(
          3
        )}, Source: ${chunk.filename})\n${chunk.content}`
    )
    .join("\n\n");

  return `${originalPrompt}

IMPORTANT: You have been provided with relevant context from a document (${documentInfo.filename}) that the user has shared. Use this context to provide more accurate and detailed responses.

DOCUMENT CONTEXT:
${contextualInfo}

Please use this context appropriately in your response. If the user's question relates to the provided context, reference it naturally. If the context doesn't seem relevant to the user's question, you can ignore it.`;
};

module.exports = buildContextualPrompt;
