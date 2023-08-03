const mongoose = require("mongoose");

const SubjectsSchema = mongoose.Schema({
  title: String,
});

module.exports = mongoose.model("subjects", SubjectsSchema);
