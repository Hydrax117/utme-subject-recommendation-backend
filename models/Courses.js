const { default: mongoose } = require("mongoose");

const CoursesSchema = mongoose.Schema({
  title: String,
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "faculties" },
  university: { type: mongoose.Schema.Types.ObjectId, ref: "universities" },
  department: String,
  recomSubject1: String,
  recomSubject2: String,
  recomSubject3: String,
  recomSubject4: String,
});

module.exports = mongoose.model("courses", CoursesSchema);
