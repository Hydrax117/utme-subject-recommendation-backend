const { default: mongoose } = require("mongoose");

const AdminShema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: String,
  password: String,
  token: String,
  phoneNumber: String,
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "universities" },
});

module.exports = mongoose.model("admin", AdminShema);
