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
