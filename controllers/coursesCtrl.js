const CoursesModel = require("../models/Courses");

module.exports.AddCourse = async (req, res) => {
  try {
    // to avoid duplicate entry
    const { title, university } = req.body;
    let v = { title, university };
    const t = await CoursesModel.find(v);

    if (t == "") {
      let course = new CoursesModel(req.body);
      course.save();
      return res.json({
        success: true,
        status: 200,
        message: "course added successfully",
        data: course,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "course already exsit in that university",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.GetCourses = async (req, res) => {
  let course = req.query;
  try {
    const University = await CoursesModel.find(course);
    return res.json({
      success: true,
      status: 200,
      message: "list of courses",
      data: University,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.GetCourse = async (req, res) => {
  let course = req.query;
  try {
    const Course = await CoursesModel.findOne(course).populate("faculty");
    return res.json({
      success: true,
      status: 200,
      message: "list of courses",
      data: Course,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
