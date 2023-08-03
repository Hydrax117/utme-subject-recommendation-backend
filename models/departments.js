const { default: mongoose } = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  name: String,
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "faculties" },
});

module.exports = mongoose.model("departments", DepartmentSchema);
