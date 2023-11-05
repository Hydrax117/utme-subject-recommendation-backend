const { default: mongoose } = require("mongoose");

const StatesSchema = mongoose.Schema({
  name: String,
  Lgas: [],
});

module.exports = mongoose.model("States", StatesSchema);
