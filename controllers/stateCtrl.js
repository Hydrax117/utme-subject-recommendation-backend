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
  let data = req.body;
  try {
    const state = new stateModel(data);
    state.save();
    return res.json({
      success: true,
      message: "course pushed in  successfully",
      data: state,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.addLgas = async (req, res) => {
  let id = req.query;
  let data = req.body;
  try {
    const state = await stateModel.findOneAndUpdate(
      id,
      { $push: { Lgas: data } },
      { new: true }
    );
    return res.json({
      success: true,
      message: "lgas pushed in  successfully",
      data: state,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.getStates = async (req, res) => {
  try {
    let states = await stateModel.find();
    if (states) {
      return res.json({
        status: success,
        message: "list of all states",
        data: states,
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

module.exports.getAllLgas = async (req, res) => {
  let id = req.query;
  try {
    let state = await stateModel.findOne(id);
    if (state.Lgas) {
      return res.json({
        success: true,
        status: 200,
        message: "list of all Lgas",
        data: state.Lgas,
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
