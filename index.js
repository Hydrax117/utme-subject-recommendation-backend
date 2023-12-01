const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dvsra4hfa",
  api_key: "341811486793292",
  api_secret: "IT96T7WYxMcm2NQA5eeCOcJDC8s",
});

// MULTER
const multer = require("multer");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage: storage });

var bodyParser = require("body-parser");
const {
  searchCandidate,
  allCandidates,
  getOneCandidate,
  OnSave,
  getCrn,
  updateImage,
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
  deleteUniversity,
  deleteCourse,
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

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file provided");
  }

  // Access the uploaded file details
  console.log("Uploaded file:", req.file);

  // Upload file to Cloudinary
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return res.status(500).send("Error uploading file to Cloudinary");
    }

    // Access the Cloudinary response
    console.log("Cloudinary response:", result);

    // Return the Cloudinary URL of the uploaded image
    res.status(201).json({
      success: true,
      message: "upload was successfull",
      uri: result.url,
    });
  });
});

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
app.get("/crn", getCrn);
app.post("/update/image", updateImage);

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

app.delete("/delete-university", deleteUniversity);
app.delete("/delete-course", deleteCourse);
