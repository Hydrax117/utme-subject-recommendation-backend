const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

var bodyParser = require("body-parser");
const {
  searchCandidate,
  allCandidates,
  getOneCandidate,
  OnSave,
} = require("./controllers/candidateCtrl");
const { register, login } = require("./auth/auth");
const {
  AddUniversity,
  AllUniversity,
  getOneUniversity,
  AddCourse,
  GetCourses,
  getOneCourse,
  getCourses,
} = require("./controllers/universitiesCtrl");
const {
  addState,
  addLgas,
  allStates,
  getAllLgas,
} = require("./controllers/stateCtrl");
const { adminLogin, adminRegister } = require("./controllers/adminCtrl");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Set up Global configuration access
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("server started at http://localhost:" + process.env.PORT);
});

// conection to database
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
app.post("/api/add-state", addState);
app.post("/api/add-lga", addLgas);
app.get("/api/all-states", allStates);
app.get("/api/all-lgas", getAllLgas);

app.post("/login", login);
app.post("/add-candidate", register);
app.post("/search", searchCandidate);
app.get("/all-candidates", allCandidates);
app.get("/get-candidate", getOneCandidate);

// api routes for adding departments and faculties
app.post("/add-university", AddUniversity);

app.post("/add-course", AddCourse);
app.get("/all-universities", AllUniversity);
app.get("/get-university", getOneUniversity);
app.post("/save", OnSave);

app.get("/get-courses", GetCourses);
app.get("/student/get-courses", getCourses);

app.get("/get-course", getOneCourse);

app.post("/admin/login", adminLogin);
app.post("/admin/register", adminRegister);
