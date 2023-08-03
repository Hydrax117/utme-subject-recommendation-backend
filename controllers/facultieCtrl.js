const facultiesModel = require("../models/faculties");

module.exports.AddFaculty = async (req, res) => {
  try {
    // to avoid duplicate entry
    const title = req.body.name;
    const t = await facultiesModel.find({ name: title });

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
