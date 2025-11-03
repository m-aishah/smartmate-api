const getOpenRouterResponse = async ({
  model = process.env.DEFAULT_OPEN_ROUTER_MODEL,
  messages
}) => {
  const response = await fetch(process.env.OPEN_ROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  const data = await response.json();
  if (!response.ok) {
    return {
      success: false,
      error: data.error || "Unable to fetch response from OpenRouter"
    };
  }

  const aiMessage =
    (data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content) ||
    "";

  return { responseData: data, aiMessage, success: true };
};

module.exports = getOpenRouterResponse;
