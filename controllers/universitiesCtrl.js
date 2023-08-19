const facultiesModel = require("../models/faculties");
const universitiesModel = require("../models/universities");

module.exports.AddUniversity = async (req, res) => {
  try {
    // to avoid duplicate entry
    const title = req.body.name;
    const t = await universitiesModel.find({ name: title });

    if (t == "") {
      let university = new universitiesModel(req.body);
      university.save();
      return res.json({
        success: true,
        status: 200,
        message: "university added successfully",
        data: university,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "university already exsit",
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

module.exports.AddCourse = async (req, res) => {
  try {
    const a = req.query;
    console.log(a);
    const data = req.body;
    const ba = await universitiesModel.findOne(a);

    for (i = 0; i < ba.courses.length; i++) {
      if (ba.courses[i].title.toString() === req.body.title.toString()) {
        return res.json({
          success: false,
          message: "course already exist",
        });
      } else {
      }
    }

    const b = await universitiesModel.findOneAndUpdate(
      a,
      { $push: { courses: data } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "course pushed in  successfully",
      data: b,
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports.GetCourses = async (req, res) => {
  const id = req.query.university;
  const faculty = req.query.faculty.toString();
  const department = req.query.department.toString();
  try {
    const courses = await universitiesModel.findOne({
      _id: id,
    });
    let foundCourses = courses.courses;
    let b = [];
    for (i = 0; i < foundCourses.length; i++) {
      if (
        foundCourses[i].faculty.toString() === faculty &&
        foundCourses[i].department.toString() === department
      ) {
        b.push(foundCourses[i]);
      }
    }

    return res.json({
      success: true,
      message: "list of courss",
      data: b,
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports.AllUniversity = async (req, res) => {
  try {
    const University = await universitiesModel.find();
    return res.json({
      success: true,
      status: 200,
      message: "list of universities",
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

module.exports.getOneUniversity = async (req, res) => {
  try {
    const query = req.query;

    var university = await universitiesModel.findOne(query);
    if (university) {
      return res.json({
        success: true,
        message: `all level courses`,
        data: university,
      });
    } else {
      return res.json({
        success: false,
        message: `no results yet`,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.getOneCourse = async (req, res) => {
  const id = req.query;
  let courseID = req.query._id.toString();
  let facultyID = req.query.faculty;
  const departmentID = req.query.dept.toString();

  var foundCourse = [];

  const course = await universitiesModel.findOne({
    courses: { $elemMatch: { $eq: id } },
  });

  const faculty = await facultiesModel.findOne({ id: facultyID });
  let foundDepartment = [];
  let departmentsArray = faculty.departments;
  if (faculty) {
    for (i = 0; i < departmentsArray.length; i++) {
      if (departmentsArray[i]._id.toString() === departmentID) {
        foundDepartment = departmentsArray[i];
      }
    }
  }
  for (i = 0; i < course.courses.length; i++) {
    if (course.courses[i]._id.toString() === courseID) {
      foundCourse = course.courses[i];
      foundCourse.faculty = faculty.name;
      foundCourse.department = foundDepartment.name;
    }
  }

  if (course) {
    return res.json({
      success: true,
      message: "books pushed in  successfully",
      data: foundCourse,
    });
  }
};
module.exports.getOneDepartment = async (req, res) => {
  const id = req.query.faculty;
  const did = req.query.dept.toString();
  let f = await facultiesModel.findOne({ _id: id });
  let dept = [];
  let k = f.departments;
  if (f) {
    for (i = 0; i < k.length; i++) {
      if (k[i]._id.toString() === did) {
        dept = k[i];
      }
      return res.json({
        success: true,
        message: "books pushed in  successfully",
        data: dept,
      });
    }
  } else {
    return res.json({
      success: false,
      message: "eerror",
    });
  }
};
