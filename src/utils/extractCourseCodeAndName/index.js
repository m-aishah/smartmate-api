const extractCourseCodeAndName = ({ course }) => {
  const [courseCode, ...courseNameParts] = course.split(" - ");
  const courseName = courseNameParts.join(" - ").trim();

  return { courseCode, courseName };
};

module.exports = extractCourseCodeAndName;
