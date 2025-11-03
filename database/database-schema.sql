USE `smartmate_api_db`;

-- DONT MODIFY THIS MIGRATION
-- it is used by Xest local development pipeline
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `migrations` (
  name,
  run_on
) VALUES (
  "/20211107064324-database-schema",
  "20211107064324"
);

-- YOU CAN MODIFY BELOW THIS LINE
DROP TABLE IF EXISTS user_types;
CREATE TABLE user_types(
  user_type_id int AUTO_INCREMENT PRIMARY KEY,
  user_type VARCHAR(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
  user_id int AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  student_number VARCHAR(50) UNIQUE,
  university VARCHAR(50) ,
  year_of_study VARCHAR(50),
  current_semester VARCHAR(50) ,
  language_preference VARCHAR(50) DEFAULT 'en',  
  password VARCHAR(500) NOT NULL,
  user_type_id int NOT NULL,
  auth_provider VARCHAR(50) DEFAULT 'email',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_type_id) REFERENCES user_types(user_type_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;


DROP TABLE IF EXISTS password_recovery_requests;
CREATE TABLE password_recovery_requests(
	password_recovery_request_id int AUTO_INCREMENT PRIMARY KEY,
  requested_email VARCHAR(150) NOT NULL,
	shortcode VARCHAR(40) NOT NULL UNIQUE,
  recovered_at DATETIME,
  expiry_date DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (requested_email) REFERENCES users(email)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS system_prompts;
CREATE TABLE system_prompts(
  system_prompt_id int AUTO_INCREMENT PRIMARY KEY,
  prompt_name VARCHAR(50) NOT NULL UNIQUE,
  prompt_description VARCHAR(255),
  prompt TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS chats;
CREATE TABLE chats(
  chat_id int AUTO_INCREMENT PRIMARY KEY,
  system_prompt_id int NOT NULL,
  created_by int NOT NULL,
  chat_title VARCHAR(50) NOT NULL,
  chat_description VARCHAR(255),
  messages JSON,
  chat_type VARCHAR(50) NOT NULL,
  cover_image VARCHAR(255),
  is_favourite BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (system_prompt_id) REFERENCES system_prompts(system_prompt_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

-- DROP TABLE IF EXISTS chat_messages;
-- CREATE TABLE chat_messages(
--   chat_message_id int AUTO_INCREMENT PRIMARY KEY,
--   chat_id int NOT NULL,
--   sender_id int NOT NULL,
--   sender_type VARCHAR(50) NOT NULL,
--   message TEXT NOT NULL,
--   is_deleted BOOLEAN DEFAULT FALSE,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   deleted_at DATETIME,
--   FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
--   FOREIGN KEY (sender_id ) REFERENCES users(user_id)
-- ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS courses;
CREATE TABLE courses(
  course_id int AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(50) NOT NULL UNIQUE,
  course_name VARCHAR(50) NOT NULL,
  course_description VARCHAR(255),
  lecturer_name VARCHAR(50) NOT NULL,
  year_of_study VARCHAR(50) NOT NULL,
  semester VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS course_enrolments;
CREATE TABLE course_enrolments(
  course_enrolment_id int AUTO_INCREMENT PRIMARY KEY,
  student_id int NOT NULL,
  course_id int NOT NULL,
  progress_percentage INT DEFAULT 0,
  progress_status VARCHAR(50) DEFAULT 'not started',
  notes TEXT,
  is_favourite BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS model_stack_processor_tasks;
CREATE TABLE model_stack_processor_tasks(
  task_id VARCHAR(50) PRIMARY KEY,
  task_type VARCHAR(50) NOT NULL,
  result JSON,
  status VARCHAR(50) DEFAULT 'pending',
  message TEXT,
  status_url VARCHAR(255),
  progress_percentage INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completed_at DATETIME
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS summaries;
CREATE TABLE summaries(
  summary_id int AUTO_INCREMENT PRIMARY KEY,
  course_id int NOT NULL,
  created_by int NOT NULL,
  summary_title VARCHAR(50),
  summary_description VARCHAR(255),
  brief_summary VARCHAR(255),
  detailed_summary TEXT, -- TODO: change this to a summary file???
  key_points TEXT,
  summarisation_task_id VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  FOREIGN KEY (summarisation_task_id) REFERENCES model_stack_processor_tasks(task_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;



DROP TABLE IF EXISTS recordings;
CREATE TABLE recordings(
  recording_id int AUTO_INCREMENT PRIMARY KEY,
  course_id int NOT NULL,
  created_by int NOT NULL,
  recording_type VARCHAR(50) NOT NULL,
  recording_microsoft_teams_url VARCHAR(255),
  recording_file VARCHAR(255),
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS lectures;
CREATE TABLE lectures(
  lecture_id int AUTO_INCREMENT PRIMARY KEY,
  course_id int NOT NULL,
  created_by int NOT NULL,
  lecture_title VARCHAR(50),
  lecture_description VARCHAR(255),
  summary_id int,
  recording_id int,
  is_favourite BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (summary_id) REFERENCES summaries(summary_id),
  FOREIGN KEY (recording_id) REFERENCES recordings(recording_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;


DROP TABLE IF EXISTS deadlines;
CREATE TABLE deadlines(
  deadline_id int AUTO_INCREMENT PRIMARY KEY,
  course_id int NOT NULL,
  created_by int NOT NULL,
  deadline_title VARCHAR(50) NOT NULL,
  deadline_description VARCHAR(255),
  deadline_date DATETIME NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS quotes;
CREATE TABLE quotes(
  quote_id int AUTO_INCREMENT PRIMARY KEY,
  en_quote TEXT NOT NULL,
  tr_quote TEXT NOT NULL,
  author VARCHAR(50) NOT NULL,
  is_favourite BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS todos;
CREATE TABLE todos(
  todo_id int AUTO_INCREMENT PRIMARY KEY,
  created_by int NOT NULL,
  todo_title VARCHAR(50) NOT NULL,
  todo_description VARCHAR(255),
  is_completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(50) DEFAULT 'low', -- low, normal, high
  is_deleted BOOLEAN DEFAULT FALSE,
  due_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications(
  notification_id int AUTO_INCREMENT PRIMARY KEY,
  user_id int NOT NULL,
  notification_type VARCHAR(50) NOT NULL,
  notification_title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS quizzes;
CREATE TABLE quizzes(
  quiz_id int AUTO_INCREMENT PRIMARY KEY,
  lecture_id int NOT NULL,
  created_by int NOT NULL,
  quiz_title VARCHAR(100) NOT NULL,
  questions TEXT NOT NULL, -- stores array of question ids [0,1,2,3]
  instructions TEXT,
  quiz_status VARCHAR(50) DEFAULT 'active', -- active, archived, deleted
  -- generation_task_id VARCHAR(50), -- links to model_stack_processor_tasks for AI generation
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (lecture_id) REFERENCES lectures(lecture_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
  -- FOREIGN KEY (generation_task_id) REFERENCES model_stack_processor_tasks(task_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS quiz_submissions;
CREATE TABLE quiz_submissions(
  submission_id int AUTO_INCREMENT PRIMARY KEY,
  quiz_id int NOT NULL,
  user_id int NOT NULL,
  answers JSON NOT NULL, -- stores array of selected option orders [0,1,2,0]
  score DECIMAL(5,2) NOT NULL,
  total_questions int NOT NULL,
  correct_answers int NOT NULL,
  time_spent int NOT NULL, -- in seconds
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS flashcards;
CREATE TABLE flashcards(
  flashcard_id int AUTO_INCREMENT PRIMARY KEY,
  course_id int NOT NULL,
  lecture_id int NOT NULL,
  created_by int NOT NULL,
  cards TEXT NOT NULL, -- stores array of flashcard ids [0,1,2,3]
  is_favourite BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS user_analytics;
CREATE TABLE user_analytics(
  analytics_id int AUTO_INCREMENT PRIMARY KEY,
  user_id int NOT NULL,
  engagement_id int NOT NULL,
  total_courses int DEFAULT 0,
  total_lectures int DEFAULT 0,
  total_summaries int DEFAULT 0,
  total_recordings int DEFAULT 0,
  total_deadlines int DEFAULT 0,
  total_quizzes int DEFAULT 0,
  total_flashcards int DEFAULT 0,
  total_todos int DEFAULT 0,
  streak int DEFAULT 0,
  total_hours_studied DECIMAL(10,2) DEFAULT 0.00,
  last_active DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS user_engagements;
CREATE TABLE user_engagements(
  engagement_id int AUTO_INCREMENT PRIMARY KEY,
  user_id int NOT NULL,
  course_id int NOT NULL,
  engagement_type VARCHAR(50) NOT NULL, -- e.g., 'view', 'edit', 'delete'
  engagement_details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;