const { default: mongoose } = require("mongoose");

const FacultySchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("faculties", FacultySchema);
