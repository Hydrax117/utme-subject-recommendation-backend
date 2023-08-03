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
  token: String,
  phone_number: String,
  address: String,
  payment_status: String,
  selected_subjects: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "subjects" },
    },
  ],
});

module.exports = mongoose.model("Candidate", CandidateSchema);
