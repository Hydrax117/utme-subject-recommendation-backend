const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

var bodyParser = require("body-parser");
const {
  searchCandidate,
  allCandidates,
} = require("./controllers/candidateCtrl");
const { register, login } = require("./auth/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Set up Global configuration access
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("server started at http://localhost:" + process.env.PORT);
});
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to the database!"));

app.get("/", (req, res) => {
  res.send("kasu/18/csc/1024");
});
app.post("/login", login);
app.post("/add-candidate", register);
app.post("/search", searchCandidate);
app.get("/all-candidates", allCandidates);
