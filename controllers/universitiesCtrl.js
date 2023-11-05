const universitiesModel = require("../models/universities");

module.exports.AddUniversity = async (req, res) => {
  try {
    // to avoid duplicate entry
    let data = req.body;
    let name = req.body.name;

    let f = await universitiesModel.findOne({ name: name });
    if (f) {
      return res.json({
        success: false,
        status: 400,
        message: "university already exist",
      });
    }

    let university = await new universitiesModel(data);
    university.save();

    return res.json({
      success: true,
      status: 200,
      message: "university added dd successfully",
      data: university,
    });
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
    const data = req.body;
    const foundUniverstiy = await universitiesModel.findOne(a);
    var exsitingCourse = [];

    // looping through the found unversitiy and the request body to chceck if a course with similar tltle already exsist in the database
    for (i = 0; i < foundUniverstiy.courses.length; i++) {
      for (j = 0; j < req.body.length; j++) {
        if (
          foundUniverstiy.courses[i].title.toString() ===
          req.body[j].title.toString()
        ) {
          // pushing courses with same title in to the exsisting course array
          exsitingCourse.push(foundUniverstiy.courses[i].title.toString());
          return res.json({
            success: false,
            message:
              "the course " + exsitingCourse + " is already in the database",
          });
        } else {
          // to check if the csv file has empty files or does not have the required fields
          if (
            !req.body[j].title ||
            !req.body[j].faculty ||
            !req.body[j].recomSubject1 ||
            !req.body[j].recomSubject2 ||
            !req.body[j].recomSubject3 ||
            !req.body[j].recomSubject4
          ) {
            return res.json({
              success: true,
              message: "empty filelds make the csv fomart is correct",
            });
          }
        }
      }
    }
    const newCourse = await universitiesModel.findOneAndUpdate(
      a,
      { $push: { courses: data } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "course pushed in  successfully",
      data: newCourse,
    });
  } catch (error) {
    return res.send(error.message);
  }
};
module.exports.GetCourses = async (req, res) => {
  const id = req.query.university;
  const faculty = req.query.faculty.toString();
  try {
    const courses = await universitiesModel.findOne({
      _id: id,
    });
    let foundCourses = courses.courses;
    let b = [];
    for (i = 0; i < foundCourses.length; i++) {
      if (foundCourses[i].faculty.toString() === faculty) {
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

module.exports.getCourses = async (req, res) => {
  const id = req.query.university;
  try {
    const courses = await universitiesModel.findOne({
      _id: id,
    });

    return res.json({
      success: true,
      message: "list of courss",
      data: courses.courses,
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
  try {
    const id = req.query.courseid.toString();
    const uni = req.query.university;
    // let facultyID = req.query.faculty;

    var foundCourse = [];

    const university = await universitiesModel.findOne({ _id: uni });

    // const faculty = await facultiesModel.findOne({ id: facultyID });
    // if (faculty) {
    // }
    for (i = 0; i < university.courses.length; i++) {
      if (university.courses[i]._id.toString() === id) {
        foundCourse = university.courses[i];
      }
    }

    if (university) {
      return res.json({
        success: true,
        message: "Found Course",
        data: foundCourse,
      });
    } else {
      return res.json({
        success: false,
        message: "Course not found",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};
// module.exports.getOneDepartment = async (req, res) => {
//   const id = req.query.faculty;
//   const did = req.query.dept.toString();
//   let f = await facultiesModel.findOne({ _id: id });
//   let dept = [];
//   let k = f.departments;
//   if (f) {
//     for (i = 0; i < k.length; i++) {
//       if (k[i]._id.toString() === did) {
//         dept = k[i];
//       }
//       return res.json({
//         success: true,
//         message: "books pushed in  successfully",
//         data: dept,
//       });
//     }
//   } else {
//     return res.json({
//       success: false,
//       message: "eerror",
//     });
//   }
// };
