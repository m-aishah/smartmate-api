const express = require("express");
const multer = require("multer");
// const createMinioStorage = require("~root/lib/multer-minio-storage");

// const { ADMIN } = require("~root/constants/userTypes");
const postUser = require("./controllers/users/register");
const postLogin = require("./controllers/users/login");

const getUserData = require("./controllers/users/getUserData");
const putUserDetails = require("./controllers/users/putUserDetails");
const authentication = require("./middlewares/authentication");
// const authorise = require("./middlewares/authorisation");
const getUserTypes = require("./controllers/users/userTypes");
const putPassword = require("./controllers/password-recovery/putPassword");
const postRecoveryRequest = require("./controllers/password-recovery/postRecoveryRequest");
const healthcheck = require("./platform/healthcheck");

const getUserCourses = require("./controllers/courses/getUserCourses");

const getUserLectures = require("./controllers/lectures/getUserLectures");
const getLectureById = require("./controllers/lectures/getLectureById");
const postLecture = require("./controllers/lectures/postLecture");
const putLecture = require("./controllers/lectures/putLecture");
const deleteLecture = require("./controllers/lectures/deleteLecture");

const getLectureProcessStatus = require("./controllers/lectures/getLectureProcessStatus");

const getUserSummaries = require("./controllers/summaries/getUserSummaries");
const getSummaryById = require("./controllers/summaries/getSummaryById");
const putSummary = require("./controllers/summaries/putSummary");
const deleteSummary = require("./controllers/summaries/deleteSummary");

const getQuotes = require("./controllers/quotes/getQuotes");

const getUserTasks = require("./controllers/tasks/getUserTasks");
const postTask = require("./controllers/tasks/postTask");
const puTask = require("./controllers/tasks/putTask");
const deleteTask = require("./controllers/tasks/deleteTask");

const getUserDeadlines = require("./controllers/deadlines/getUserDeadlines");
const postDeadline = require("./controllers/deadlines/postDeadline");
const putDeadline = require("./controllers/deadlines/putDeadline");
const deleteDeadline = require("./controllers/deadlines/deleteDeadline");

const getUserQuizzes = require("./controllers/quizzes/getUserQuizzes");

const getSystemPromptById = require("./controllers/chats/getSystemPromptById");
const getUserChats = require("./controllers/chats/getUserChats");
const getUserChatById = require("./controllers/chats/getUserChatById");
const postChat = require("./controllers/chats/postChat");

const router = express.Router();

// const storage = createMinioStorage();
// const upload = multer({ storage });

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

// USER MANAGEMENT
router.post("/register", postUser);

router.post("/login", postLogin);

router.get("/user", authentication, getUserData);

router.put("/edit/user", authentication, putUserDetails);

router.get("/user-types", getUserTypes);

router.post("/recovery-request", postRecoveryRequest);

router.put("/update-password/:shortcode", putPassword);

router.get("/healthcheck", healthcheck);

// COURSES
router.get("/courses", authentication, getUserCourses);

// LECTURES
router.get("/lectures", authentication, getUserLectures);

router.get("/lectures/:lectureId", authentication, getLectureById);

router.post("/lectures", authentication, upload.single("lecture"), postLecture);

router.put("/lectures/:lectureId", authentication, putLecture);

router.delete("/lectures/:lectureId", authentication, deleteLecture);

router.get(
  "/lectures/progress/:taskId",
  authentication,
  getLectureProcessStatus
);

// SUMMARIES
router.get("/summaries", authentication, getUserSummaries);

router.get("/summaries/:summaryId", authentication, getSummaryById);

router.put("/summaries/:summaryId", authentication, putSummary);

router.delete("/summaries/:summaryId", authentication, deleteSummary);

// QUOTES
router.get("/quotes", authentication, getQuotes);
// router.get("/favorite-quotes", authentication, getUserFavoriteQuotes);
// router.post("/favorite-quotes", authentication, postFavoriteQuote);
// router.delete("/favorite-quotes/:quoteId", authentication, deleteFavoriteQuote);

// NOTIFICATIONS
// router.get("/notifications", authentication, getNotifications);
// router.post("/notifications", authentication, postNotification);
// router.put("/notifications/:notificationId", authentication, putNotification);
// router.delete("/notifications/:notificationId", authentication, deleteNotification);
// router.get("/notifications/unread", authentication, getUnreadNotifications);
// router.get("/notifications/read", authentication, getReadNotifications);

// TODOS
router.get("/tasks", authentication, getUserTasks);
router.post("/tasks", authentication, postTask);
router.put("/tasks/:taskId", authentication, puTask);
router.delete("/tasks/:taskId", authentication, deleteTask);
// router.get("/todos/completed", authentication, getCompletedTodos);
// router.get("/todos/pending", authentication, getPendingTodos);

// DEADLINES
router.get("/deadlines", authentication, getUserDeadlines);
router.post("/deadlines", authentication, postDeadline);
// router.get("/deadlines/:deadlineId", authentication, getDeadlineById);
router.put("/deadlines/:deadlineId", authentication, putDeadline);
router.delete("/deadlines/:deadlineId", authentication, deleteDeadline);

// USER STREAK
// router.get("/streak", authentication, getUserStreak);
// router.post("/streak", authentication, postUserStreak);
// router.put("/streak", authentication, putUserStreak);
// router.delete("/streak", authentication, deleteUserStreak);

// QUIZZES/FLASHCARDS
router.get("/quizzes", authentication, getUserQuizzes);
// router.post("/quizzes", authentication, postQuiz);
// router.get("/quizzes/:quizId", authentication, getQuizById);
// router.put("/quizzes/:quizId", authentication, putQuiz);
// router.delete("/quizzes/:quizId", authentication, deleteQuiz);

// router.get("/flashcards", authentication, getUserFlashcards);
// router.post("/flashcards", authentication, postFlashcard);
// router.get("/flashcards/:flashcardId", authentication, getFlashcardById);
// router.put("/flashcards/:flashcardId", authentication, putFlashcard);
// router.delete("/flashcards/:flashcardId", authentication, deleteFlashcard);

// // AI Generation endpoints
// router.post("/generate/quiz", authentication, postGenerateQuiz);
// router.post("/generate/flashcards", authentication, postGenerateFlashcards);

// ANALYTICS
// router.get("/analytics/overview", authentication, getAnalyticsOverview);
// router.get("/analytics/performance", authentication, getPerformanceData);
// router.get("/analytics/time-spent", authentication, getTimeSpentData);
// router.get("/analytics/engagement", authentication, getEngagementData);

// CHATS

// SYSTEM PROMPT
router.get(
  "/system-prompt/:systemPromptId",
  authentication,
  getSystemPromptById
);

router.get("/chats", authentication, getUserChats);

router.get("/chat/:chatId", authentication, getUserChatById);

router.post("/chat", authentication, postChat);

module.exports = router;
