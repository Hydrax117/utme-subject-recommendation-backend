const { default: mongoose } = require("mongoose");

const UniversitiesSchema = mongoose.Schema({
  name: String,
  address: String,
  state: String,
  courses: [
    {
      title: { type: String, required: true, unique: true },
      faculty: { type: String, required: true },
      recomSubject1: { type: String, required: true, unique: true },
      recomSubject2: { type: String, required: true, unique: true },
      recomSubject3: { type: String, required: true, unique: true },
      recomSubject4: { type: String, required: true, unique: true },
    },
  ],
});

module.exports = mongoose.model("universities", UniversitiesSchema);
