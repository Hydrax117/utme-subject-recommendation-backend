const CandidateModel = require("../models/Candidate");
const universitiesModel = require("../models/universities");

module.exports.allCandidates = async (req, res) => {
  try {
    const Candidates = await CandidateModel.find();
    return res.json({
      success: true,
      status: 200,
      message: "list of all candidates",
      data: Candidates,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.searchCandidate = async (req, res) => {
  try {
    const search = req.query;
    const candidate = await CandidateModel.find(search);
    if (candidate) {
      return res.json({
        success: true,
        status: 200,
        message: `list all candidate under ${search.title}`,
        data: candidate,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "invalid parameters",
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

module.exports.getOneCandidate = async (req, res) => {
  try {
    var query = req.query;
    const candidate = await CandidateModel.findOne(query);
    if (candidate) {
      return res.json({
        success: true,
        status: 200,
        message: "user found",
        data: candidate,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "user not found",
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

module.exports.OnSave = async (req, res) => {
  let user = req.query;
  let data = req.body;
  let uni = req.body.institution;
  let u = await universitiesModel.findOne({ _id: uni });
  let unii = u.name;
  let address = u.address;

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueValue;

  while (true) {
    uniqueValue = generateRandomValue();

    const findCrn = await CandidateModel.findOne({ crn: uniqueValue });
    if (!findCrn) {
      let findUser = await CandidateModel.findOne(user);
      if (findUser) {
        findUser.crn = uniqueValue;
        findUser.institution = unii;
        findUser.institutionAddress = address;
        findUser.paymentStatus = "paid";
        findUser.save();
        let updatedUser = await CandidateModel.findOneAndUpdate(
          { _id: user },
          data,
          { new: true }
        );
        return res.json({
          success: true,
          data: uniqueValue,
          message: "user updated successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "enter a valid user id",
        });
      }
      break;
    }
  }

  function generateRandomValue() {
    let value = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      value += chars.charAt(randomIndex);
    }
    return value;
  }
};
