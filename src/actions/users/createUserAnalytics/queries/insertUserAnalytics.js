const { submitQuery, getInsertId } = require("~root/lib/database");

const insertUserAnalytics = ({
  userId,
  engagementId,
  streak,
  totalHoursStudied
}) => submitQuery`
  INSERT INTO user_analytics
  (
    user_id,
    engagement_id,
    streak,
    total_hours_studied
  )
  VALUES
  (
    ${userId},
    ${engagementId},
    ${streak},
    ${totalHoursStudied}
  )
`;

module.exports = getInsertId(insertUserAnalytics);
