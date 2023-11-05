const { default: mongoose } = require("mongoose");

const CandidateSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  state: String,
  LGA: String,
  dob: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  userType: String,
  password: String,
  crn: String,
  token: String,
  phoneNumber: String,
  paymentStatus: String,
  institution: String,
  institutionAddress: String,
  course: String,
  faculty: String,
  recomSubject1: String,
  recomSubject2: String,
  recomSubject3: String,
  recomSubject4: String,
});

module.exports = mongoose.model("Candidate", CandidateSchema);
