const { default: mongoose } = require("mongoose");

const FacultySchema = mongoose.Schema({
  name: String,
  cutoffmarks: String,
  university: { type: mongoose.Schema.Types.ObjectId, ref: "universities" },
  departments: [
    {
      name: String,
    },
  ],
});

module.exports = mongoose.model("faculties", FacultySchema);
