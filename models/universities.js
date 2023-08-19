const { default: mongoose } = require("mongoose");

const UniversitiesSchema = mongoose.Schema({
  name: String,
  address: String,
  state: String,
  courses: [
    {
      title: String,
      faculty: String,
      department: String,
      recomSubject1: String,
      recomSubject2: String,
      recomSubject3: String,
      recomSubject4: String,
    },
  ],
});

module.exports = mongoose.model("universities", UniversitiesSchema);
