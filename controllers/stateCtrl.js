const stateModel = require("../models/states");

module.exports.allStates = async (req, res) => {
  try {
    const States = await stateModel.find();
    return res.json({
      success: true,
      status: 200,
      message: "list of states",
      data: States,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
module.exports.addState = async (req, res) => {
  try {
    // to avoid duplicate entry
    const title = req.body.title;
    const t = await stateModel.find({ title: title });

    if (t == "") {
      let state = new stateModel(req.body);
      state.save();
      return res.json({
        success: true,
        status: 200,
        message: "state added successfully",
        data: state,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "state already exsit",
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
