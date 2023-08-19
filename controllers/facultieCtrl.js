const facultiesModel = require("../models/faculties");

module.exports.AddFaculty = async (req, res) => {
  try {
    // to avoid duplicate entry
    const title = req.body.name;
    const uni = req.body.university;
    const t = await facultiesModel.find({ name: title, university: uni });

    if (t == "") {
      let faculty = new facultiesModel(req.body);
      faculty.save();
      return res.json({
        success: true,
        status: 200,
        message: "faculty added successfully",
        data: faculty,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "faculty already exsit",
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

module.exports.GetFaculties = async (req, res) => {
  let query = req.query;
  try {
    const faculty = await facultiesModel.find(query);
    return res.json({
      success: true,
      status: 200,
      message: "list of faculties",
      data: faculty,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.AddDepartment = async (req, res) => {
  try {
    try {
      const a = req.query;
      console.log(a);
      const data = req.body;
      const ba = await facultiesModel.findOne(a);

      for (i = 0; i < ba.departments.length; i++) {
        if (
          ba.departments[i].name.toString().toUpperCase() ===
          req.body.name.toString().toUpperCase()
        ) {
          return res.json({
            success: false,
            message: "department already exist",
          });
        } else {
        }
      }

      const b = await facultiesModel.findOneAndUpdate(
        a,
        { $push: { departments: data } },
        { new: true }
      );

      return res.json({
        status: 200,
        success: true,
        message: "department added in  successfully",
        data: b,
      });
    } catch (error) {
      return res.send(error.message);
    }
  } catch (error) {}
};

module.exports.GetDepartments = async (req, res) => {
  const id = req.query._id;
  // const faculty = req.query.faculty.toString();

  try {
    const faculty = await facultiesModel.findOne({
      _id: id,
    });
    let a = faculty.departments;
    let b = [];
    for (i = 0; i < a.length; i++) {
      b.push(a[i]);
    }

    return res.json({
      success: true,
      status: 200,
      message: "list of departments",
      data: b,
    });
  } catch (error) {
    return res.send(error.message);
  }
};
