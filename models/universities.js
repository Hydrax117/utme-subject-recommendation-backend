const { default: mongoose } = require("mongoose");

const UniversitiesSchema = mongoose.Schema({
  name: String,
  address: String,
  state: String,
  courses: [
    {
      title: { type: String },
      faculty: { type: String },
      recomSubject1: { type: String },
      recomSubject2: { type: String },
      recomSubject3: { type: String },
      recomSubject4: { type: String },
    },
  ],
});

module.exports = mongoose.model("universities", UniversitiesSchema);
