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

// module.exports.AddCourse = async (req, res) => {
//   try {
//     const a = req.query;
//     console.log(a);
//     const data = req.body;

//     const b = await universitiesModel.findOneAndUpdate(
//       a,
//       { $push: { courses: data } },
//       { new: true }
//     );

//     return res.json({
//       success: true,
//       message: "course pushed in  successfully",
//       data: b,
//     });
//   } catch (error) {
//     return res.send(error.message);
//   }
// };
module.exports.GetOneCourse = async (req, res) => {
  const id = req.query;
  try {
    const course = await universitiesModel
      .find({ "courses._id": id })
      .select(`courses:${id}`);
    return res.json({
      success: true,
      message: "course pushed in  successfully",
      data: course,
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
