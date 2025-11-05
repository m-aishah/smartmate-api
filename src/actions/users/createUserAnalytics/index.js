const insertUserAnalytics = require("./queries/insertUserAnalytics");

const createUserAnalytics = async ({
  userId,
  engagementId = 0,
  streak = 0,
  totalHoursStudied = 0
}) => {
  const insertedUserAnalytics = await insertUserAnalytics({
    userId,
    engagementId,
    streak,
    totalHoursStudied
  });

  return { insertedUserAnalytics };
};

module.exports = createUserAnalytics;
