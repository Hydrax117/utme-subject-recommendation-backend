const { default: mongoose } = require("mongoose");

const UniversitiesSchema = mongoose.Schema({
  name: String,
  address: String,
  state: String,
});

module.exports = mongoose.model("universities", UniversitiesSchema);
