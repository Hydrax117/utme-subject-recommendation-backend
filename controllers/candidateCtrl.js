const CandidateModel = require("../models/Candidate");
const subjectModel = require("../models/subject");

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
