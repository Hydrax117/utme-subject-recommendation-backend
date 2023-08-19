const { default: mongoose } = require("mongoose");

const CandidateSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  state: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: String,
  password: String,
  crn: String,
  token: String,
  phone_number: String,
  address: String,
  payment_status: String,
  instutution: String,
  coures: String,
  faculty: String,
  department: String,
  recomSubject1: String,
  recomSubject2: String,
  recomSubject3: String,
  recomSubject4: String,
});

module.exports = mongoose.model("Candidate", CandidateSchema);
