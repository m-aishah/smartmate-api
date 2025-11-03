/* Initialize DB with some seed data */
USE `smartmate_api_db`;

-- DONT MODIFY THIS MIGRATION
-- it is used by Xest local development pipeline
INSERT INTO `migrations` (
  name,
  run_on
) VALUES (
  "/20250422103000-seed-data",
  "2025-04-22 10:30:00"
);

-- YOU CAN MODIFY BELOW THIS LINE

-- Seed user types
INSERT INTO user_types (user_type_id, user_type)
VALUES (1, "admin"),
       (2, "student"),
       (3, "lecturer");

-- Seed users
INSERT INTO users (
  user_id,
  first_name,
  last_name,
  email,
  password,
  user_type_id,
  auth_provider,
  student_number,
  university,
  year_of_study,
  current_semester,
  language_preference,
  created_at
)
VALUES
  (1, "Ahmet", "Akinsql", "ahmet@akinsql.com", SHA2(CONCAT("password","SECRET_SALT"), 224), 1, "email", "ADM001", "Middle East University", NULL, NULL, "en", "2020-11-20 12:00:00"),
  (2, "Joe", "Bloggs", "joebloggs@gmail.com", SHA2(CONCAT("password","SECRET_SALT"), 224), 2, "email", "STU002", "Middle East University", "2", "Spring", "en", "2023-09-15 09:00:00"),
  (3, "Jim", "Bloggs", "jimbloggs@yahoo.com", SHA2(CONCAT("password","SECRET_SALT"), 224), 2, "email", "STU003", "Middle East University", "1", "Spring", "en", "2024-01-10 10:30:00"),
  (4, "Sarah", "Johnson", "sarah.johnson@university.edu", SHA2(CONCAT("password","SECRET_SALT"), 224), 2, "email", "STU004", "Middle East University", "3", "Spring", "tr", "2022-08-20 14:15:00"),
  (5, "Dr. Maria", "Rodriguez", "maria.rodriguez@university.edu", SHA2(CONCAT("password","SECRET_SALT"), 224), 3, "email", NULL, "Middle East University", NULL, NULL, "en", "2019-01-15 08:00:00"),
  (6, "Prof. John", "Smith", "john.smith@university.edu", SHA2(CONCAT("password","SECRET_SALT"), 224), 3, "email", NULL, "Middle East University", NULL, NULL, "en", "2018-07-01 09:00:00");

-- Seed password recovery requests
INSERT INTO password_recovery_requests(
  shortcode,
  requested_email,
  expiry_date,
  created_at
)
VALUES 
  ("ABC123", "joebloggs@gmail.com", "2025-06-15 23:59:59", "2025-06-07 10:30:00"),
  ("XYZ789", "jimbloggs@yahoo.com", "2025-06-20 23:59:59", "2025-06-08 08:15:00");

-- Seed system prompts
INSERT INTO system_prompts (system_prompt_id, prompt_name, prompt_description, prompt)
VALUES 
  (1, "Study Buddy", "Helps explain lecture material in a simple way", "You are a helpful academic assistant that simplifies university-level content. Break down complex topics into digestible parts and provide examples."),
  (2, "Deadline Assistant", "Helps students manage upcoming deadlines", "You help students stay organized with their deadlines. Provide reminders, study schedules, and time management tips."),
  (3, "Lecture Recap", "Summarizes lecture content and answers related questions", "You provide contextual support based on lecture summaries. Help students understand key concepts and answer questions about the material."),
  (4, "Assignment Helper", "Assists with assignment planning and guidance", "You help students break down assignments, create study plans, and provide academic guidance without doing the work for them."),
  (5, "Exam Prep", "Specialized in exam preparation strategies", "You help students prepare for exams by creating study schedules, suggesting review methods, and testing their knowledge.");

-- Seed courses
INSERT INTO courses (course_id, course_code, course_name, course_description, lecturer_name, year_of_study, semester, created_at)
VALUES
  (1, "CS101", "Introduction to Programming", "Basic programming concepts using Python", "Dr. Maria Rodriguez", "1", "Fall", "2024-08-01 09:00:00"),
  (2, "CS201", "Data Structures", "Advanced data structures and algorithms", "Prof. John Smith", "2", "Spring", "2025-01-15 09:00:00"),
  (3, "MATH101", "Calculus I", "Differential and integral calculus", "Dr. Maria Rodriguez", "1", "Fall", "2024-08-01 09:00:00"),
  (4, "PHYS101", "General Physics", "Mechanics, thermodynamics, and waves", "Prof. John Smith", "1", "Spring", "2025-01-15 09:00:00"),
  (5, "ENG101", "Academic Writing", "Essay writing and research skills", "Dr. Maria Rodriguez", "1", "Fall", "2024-08-01 09:00:00");

-- Seed course enrolments
INSERT INTO course_enrolments (student_id, course_id, progress_percentage, progress_status, notes, is_favourite, created_at)
VALUES
  (2, 1, 75, "in progress", "Doing well with Python basics", TRUE, "2024-09-01 10:00:00"),
  (2, 2, 45, "in progress", "Need to review linked lists", FALSE, "2025-02-01 10:00:00"),
  (2, 3, 90, "completed", "Excellent understanding of derivatives", TRUE, "2024-09-01 10:00:00"),
  (3, 1, 30, "in progress", "Just started, learning variables", FALSE, "2025-01-20 11:00:00"),
  (3, 3, 60, "in progress", "Struggling with integration", FALSE, "2025-01-20 11:00:00"),
  (3, 5, 80, "in progress", "Good progress on essay structure", FALSE, "2025-01-20 11:00:00"),
  (4, 2, 85, "in progress", "Strong grasp of algorithms", TRUE, "2025-02-01 09:00:00"),
  (4, 4, 50, "in progress", "Physics concepts are challenging", FALSE, "2025-02-01 09:00:00");

-- Seed model stack processor tasks
INSERT INTO model_stack_processor_tasks (task_id, task_type, result, status, message, progress_percentage, created_at, completed_at)
VALUES
  ("task_001", "summarization", '{"summary": "Lecture covered Python variables and data types", "key_points": ["Variables store data", "Python has dynamic typing", "Common types: int, str, list"]}', "completed", "Summary generated successfully", 100, "2025-06-01 10:00:00", "2025-06-01 10:05:00"),
  ("task_002", "summarization", '{"summary": "Data structures lecture on arrays and lists", "key_points": ["Arrays have fixed size", "Lists are dynamic", "Access time complexity O(1)"]}', "completed", "Summary generated successfully", 100, "2025-06-02 14:00:00", "2025-06-02 14:03:00"),
  ("task_003", "summarization", NULL, "pending", "Processing lecture audio", 25, "2025-06-07 09:00:00", NULL),
  ("task_004", "summarization", '{"summary": "Calculus derivatives and rules", "key_points": ["Power rule: d/dx(x^n) = nx^(n-1)", "Chain rule for composite functions", "Product and quotient rules"]}', "completed", "Summary generated successfully", 100, "2025-06-05 11:00:00", "2025-06-05 11:04:00");

-- Seed summaries
INSERT INTO summaries (course_id, created_by, summary_title, summary_description, brief_summary, detailed_summary, key_points, summarisation_task_id, created_at)
VALUES
  (1, 2, "Python Basics", "Introduction to Python programming", "Covered variables, data types, and basic operations in Python", "This lecture introduced fundamental Python concepts including variable declaration, dynamic typing, and basic data types such as integers, strings, and lists. Students learned how to assign values to variables and perform basic operations.", "Variables store data values\nPython uses dynamic typing\nCommon data types: int, str, float, bool, list\nBasic operations: arithmetic, string concatenation", "task_001", "2025-06-01 10:10:00"),
  (2, 4, "Data Structures Overview", "Introduction to arrays and lists", "Explained the differences between arrays and lists, including performance characteristics", "Comprehensive overview of linear data structures focusing on arrays and lists. Discussed memory allocation, access patterns, and time complexity for common operations. Emphasized the trade-offs between different data structure choices.", "Arrays have fixed size and contiguous memory\nLists are dynamic and can grow/shrink\nArray access: O(1) time complexity\nList insertion/deletion: O(n) worst case\nMemory efficiency considerations", "task_002", "2025-06-02 14:10:00"),
  (3, 3, "Calculus Derivatives", "Derivative rules and applications", "Covered basic derivative rules including power, product, quotient, and chain rules", "Detailed explanation of differentiation techniques and rules. Started with the definition of a derivative as a limit, then covered the most important rules for finding derivatives of polynomial, exponential, and composite functions.", "Power rule: d/dx(x^n) = nx^(n-1)\nProduct rule: d/dx(uv) = u'v + uv'\nQuotient rule: d/dx(u/v) = (u'v - uv')/v²\nChain rule: d/dx(f(g(x))) = f'(g(x))·g'(x)", "task_004", "2025-06-05 11:10:00");

-- Seed recordings
INSERT INTO recordings (course_id, created_by, recording_type, recording_microsoft_teams_url, recording_file, created_at)
VALUES
  (1, 5, "teams_meeting", "https://teams.microsoft.com/recording/python-basics-lecture", NULL, "2025-06-01 09:00:00"),
  (2, 6, "local_file", NULL, "/recordings/data-structures-2025-06-02.mp4", "2025-06-02 13:00:00"),
  (3, 5, "teams_meeting", "https://teams.microsoft.com/recording/calculus-derivatives", NULL, "2025-06-05 10:00:00"),
  (4, 6, "local_file", NULL, "/recordings/physics-mechanics-2025-06-06.mp4", "2025-06-06 14:00:00");

-- Seed lectures
INSERT INTO lectures (course_id, created_by, lecture_title, lecture_description, summary_id, recording_id, is_favourite, is_pinned, created_at)
VALUES
  (1, 5, "Python Variables & Types", "Introduction to Python programming fundamentals", 1, 1, FALSE, TRUE, "2025-06-01 09:00:00"),
  (2, 6, "Arrays vs Lists", "Comparing linear data structures", 2, 2, TRUE, FALSE, "2025-06-02 13:00:00"),
  (3, 5, "Derivative Rules", "Essential calculus differentiation techniques", 3, 3, TRUE, TRUE, "2025-06-05 10:00:00"),
  (4, 6, "Newton's Laws", "Fundamental principles of mechanics", NULL, 4, FALSE, FALSE, "2025-06-06 14:00:00"),
  (1, 5, "Control Structures", "If statements, loops, and functions in Python", NULL, NULL, FALSE, FALSE, "2025-06-08 09:00:00");

-- Seed chats
INSERT INTO chats (
  system_prompt_id, created_by, chat_title, chat_description, 
  messages, chat_type, cover_image, 
  is_favourite, is_archived, is_deleted, is_pinned, 
  created_at
)
VALUES
  (1, 2, "Python Help", "Getting help with Python programming", 
   '[{"role": "user", "content": "Can you explain how Python handles variables?"}, {"role": "assistant", "content": "Sure! In Python, you dont need to declare variable types explicitly. You just assign a value to a variable name, like this: x = 5 or name = \\"Alice\\". Python figures out the type automatically."}]',
   "study_assistance", NULL, TRUE, FALSE, FALSE, FALSE, "2025-06-01 11:00:00"),
  (2, 2, "Assignment Planning", "Planning my CS201 assignment", 
   '[{"role": "user", "content": "I need help planning my CS201 assignment."}, {"role": "assistant", "content": "Of course! Can you tell me more about the assignment requirements and deadline? I\ll help you create a structured plan to tackle it step by step."}]',
   "deadline_management", NULL, FALSE, FALSE, FALSE, TRUE, "2025-06-03 15:00:00"),
  (3, 3, "Calculus Questions", "Questions about derivatives lecture", 
   '[{"role": "user", "content": "I am having trouble understanding the chain rule."}, {"role": "assistant", "content": "The chain rule helps differentiate composite functions. If y = f(g(x)), then dy/dx = f(g(x)) * g(x). Think of it like peeling layers - differentiate the outer function first, then multiply by the inner functions derivative."}]',
   "lecture_discussion", NULL, TRUE, FALSE, FALSE, FALSE, "2025-06-05 12:00:00"),
  (4, 4, "Data Structures Study", "Preparing for midterm exam", 
   '[{"role": "user", "content": "Can you help me understand linked lists?"}, {"role": "assistant", "content": "Of course! A linked list is a linear data structure where each element (node) contains data and a reference to the next node. Unlike arrays, they dont require contiguous memory allocation."}]',
   "exam_prep", NULL, FALSE, FALSE, FALSE, FALSE, "2025-06-06 16:00:00"),
  (1, 3, "Programming Basics", "Understanding fundamental concepts", 
   '[{"role": "user", "content": "What is the difference between a for loop and a while loop?"}, {"role": "assistant", "content": "Great question! A for loop is used when you know exactly how many times you want to iterate. A while loop continues as long as a condition is true, which is perfect when you dont know the exact number of iterations in advance."}]',
   "study_assistance", NULL, FALSE, FALSE, FALSE, FALSE, "2025-06-07 10:00:00");

-- Seed deadlines
INSERT INTO deadlines (course_id, created_by, deadline_title, deadline_description, deadline_date, created_at)
VALUES
  (1, 2, "Python Project", "Create a simple calculator program", "2025-06-15 23:59:59", "2025-06-01 12:00:00"),
  (2, 2, "Data Structures Assignment", "Implement linked list with basic operations", "2025-06-20 23:59:59", "2025-06-03 10:00:00"),
  (3, 3, "Calculus Midterm", "Midterm exam covering derivatives", "2025-06-18 14:00:00", "2025-06-05 09:00:00"),
  (4, 4, "Physics Lab Report", "Report on pendulum experiment", "2025-06-22 17:00:00", "2025-06-06 11:00:00"),
  (1, 3, "Python Quiz", "Online quiz on basic syntax", "2025-06-12 23:59:59", "2025-06-07 08:00:00"),
  (2, 4, "Algorithm Analysis", "Big O notation homework", "2025-06-25 23:59:59", "2025-06-04 14:00:00");

-- Seed quotes
INSERT INTO quotes (en_quote, tr_quote, author, is_favourite, is_pinned, created_at)
VALUES
  ("The only way to learn mathematics is to do mathematics.", "Matematiği öğrenmenin tek yolu matematik yapmaktır.", "Paul Halmos", TRUE, TRUE, "2025-06-01 08:00:00"),
  ("In programming, the hard part isn't solving problems, but deciding what problems to solve.", "Programlamada zor olan problemleri çözmek değil, hangi problemleri çözeceğine karar vermektir.", "Paul Graham", FALSE, FALSE, "2025-06-02 08:00:00"),
  ("Education is the most powerful weapon which you can use to change the world.", "Eğitim, dünyayı değiştirmek için kullanabileceğiniz en güçlü silahtır.", "Nelson Mandela", TRUE, FALSE, "2025-06-03 08:00:00"),
  ("The best way to learn is to teach.", "Öğrenmenin en iyi yolu öğretmektir.", "Frank Oppenheimer", FALSE, TRUE, "2025-06-04 08:00:00"),
  ("Success is not final, failure is not fatal: it is the courage to continue that counts.", "Başarı nihai değildir, başarısızlık ölümcül değildir: önemli olan devam etme cesaretidir.", "Winston Churchill", TRUE, FALSE, "2025-06-05 08:00:00");

-- Seed todos
INSERT INTO todos (created_by, todo_title, todo_description, is_completed, created_at)
VALUES
  (2, "Review Python loops", "Go through for and while loop examples", FALSE, "2025-06-07 09:00:00"),
  (2, "Complete CS201 assignment", "Finish implementing the linked list", FALSE, "2025-06-07 09:05:00"),
  (2, "Study for calculus exam", "Review derivative rules and practice problems", FALSE, "2025-06-07 09:10:00"),
  (3, "Read Chapter 3", "Read chapter on functions in Python textbook", TRUE, "2025-06-06 10:00:00"),
  (3, "Practice calculus problems", "Work through problems 1-20 in textbook", FALSE, "2025-06-07 11:00:00"),
  (4, "Prepare physics presentation", "Create slides for Newton's Laws presentation", FALSE, "2025-06-07 14:00:00"),
  (4, "Review data structures notes", "Go through lecture notes before exam", FALSE, "2025-06-07 15:00:00");

-- Seed notifications
INSERT INTO notifications (user_id, notification_type, notification_title, message, is_read, created_at)
VALUES
  (2, "deadline_reminder", "Assignment Due Soon", "Your Python Project is due in 8 days (June 15th)", FALSE, "2025-06-07 08:00:00"),
  (2, "lecture_summary", "New Summary Available", "Summary for 'Python Variables & Types' lecture is now available", TRUE, "2025-06-01 10:15:00"),
  (3, "deadline_reminder", "Exam Tomorrow", "Don't forget: Calculus Midterm is tomorrow at 2:00 PM", FALSE, "2025-06-17 08:00:00"),
  (3, "course_update", "New Lecture Added", "New lecture 'Control Structures' has been added to CS101", FALSE, "2025-06-08 09:30:00"),
  (4, "deadline_reminder", "Lab Report Due", "Physics Lab Report is due in 15 days", FALSE, "2025-06-07 08:00:00"),
  (2, "system_message", "Welcome to SmartMate", "Welcome to your AI-powered study assistant!", TRUE, "2025-06-01 00:00:00"),
  (3, "system_message", "Welcome to SmartMate", "Welcome to your AI-powered study assistant!", TRUE, "2025-01-20 11:00:00"),
  (4, "system_message", "Welcome to SmartMate", "Welcome to your AI-powered study assistant!", TRUE, "2022-08-20 14:15:00");

-- Seed quizzes
INSERT INTO quizzes (lecture_id, created_by, quiz_title, questions, instructions, quiz_status, created_at)
VALUES
  (1, 5, "Python Variables Quiz", 
   '[
     {
       "question": "Which of the following is a valid Python variable name?",
       "options": ["2variable", "variable_name", "variable-name", "variable name"],
       "correct_answer": 1
     },
     {
       "question": "What data type is the value 42 in Python?",
       "options": ["string", "float", "int", "boolean"],
       "correct_answer": 2
     },
     {
       "question": "How do you create a string variable in Python?",
       "options": ["name = \"John\"", "name = John", "string name = \"John\"", "var name = \"John\""],
       "correct_answer": 0
     },
     {
       "question": "What is the result of type(3.14) in Python?",
       "options": ["<class ''int''>", "<class ''float''>", "<class ''str''>", "<class ''decimal''>"],
       "correct_answer": 1
     },
     {
       "question": "Which operator is used to check if two variables are equal in Python?",
       "options": ["=", "==", "!=", "==="],
       "correct_answer": 1
     }
   ]', 
   "Answer all questions about Python variables and data types. You have 15 minutes to complete this quiz.", 
   "active", 
   "2025-06-01 11:00:00"),
   
  (2, 6, "Data Structures Quiz", 
   '[
     {
       "question": "What is the time complexity of accessing an element in an array by index?",
       "options": ["O(n)", "O(log n)", "O(1)", "O(n²)"],
       "correct_answer": 2
     },
     {
       "question": "Which data structure follows the Last In, First Out (LIFO) principle?",
       "options": ["Queue", "Stack", "Array", "Linked List"],
       "correct_answer": 1
     },
     {
       "question": "What is the main advantage of a linked list over an array?",
       "options": ["Faster access time", "Dynamic size", "Less memory usage", "Better cache performance"],
       "correct_answer": 1
     },
     {
       "question": "In Python, which method adds an element to the end of a list?",
       "options": ["add()", "append()", "insert()", "push()"],
       "correct_answer": 1
     },
     {
       "question": "What data structure would be most appropriate for implementing a breadth-first search?",
       "options": ["Stack", "Queue", "Array", "Hash Table"],
       "correct_answer": 1
     }
   ]', 
   "Test your understanding of arrays and lists. Choose the best answer for each question.", 
   "active", 
   "2025-06-02 15:00:00"),
   
  (3, 5, "Derivatives Practice", 
   '[
     {
       "question": "What is the derivative of f(x) = x²?",
       "options": ["x", "2x", "x²", "2x²"],
       "correct_answer": 1
     },
     {
       "question": "What is the derivative of f(x) = sin(x)?",
       "options": ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
       "correct_answer": 0
     },
     {
       "question": "Using the power rule, what is the derivative of f(x) = x³?",
       "options": ["x²", "3x", "3x²", "x³"],
       "correct_answer": 2
     },
     {
       "question": "What is the derivative of f(x) = 5x + 3?",
       "options": ["5", "5x", "3", "8"],
       "correct_answer": 0
     },
     {
       "question": "What is the derivative of f(x) = eˣ?",
       "options": ["eˣ", "xeˣ⁻¹", "ln(x)", "1/x"],
       "correct_answer": 0
     }
   ]', 
   "Apply derivative rules to solve these calculus problems. Show your work where applicable.", 
   "active", 
   "2025-06-05 12:00:00");

-- Seed quiz submissions
INSERT INTO quiz_submissions (quiz_id, user_id, answers, score, total_questions, correct_answers, time_spent, submitted_at)
VALUES
  (1, 2, '[0,1,2,0,1]', 80.00, 5, 4, 720, "2025-06-01 12:30:00"),
  (1, 3, '[1,1,2,0,0]', 60.00, 5, 3, 900, "2025-06-01 13:15:00"),
  (2, 4, '[0,2,1,1,0]', 100.00, 5, 5, 600, "2025-06-02 16:45:00"),
  (2, 2, '[0,1,1,1,0]', 80.00, 5, 4, 780, "2025-06-03 14:20:00"),
  (3, 3, '[2,0,1,0,2]', 40.00, 5, 2, 1200, "2025-06-05 13:30:00");