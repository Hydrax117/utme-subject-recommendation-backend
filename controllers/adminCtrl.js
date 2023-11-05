const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");

const JWT_SECRET_KEY = process.env.TOKEN_KEY;

function generateAuthToken(data) {
  const token = jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "10h" });
  return token;
}

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    let user = await adminModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: true,
        status: 400,
        message: "user does not exist with this email and password",
      });
    }

    // bcrypting the password and comparing with the one in db
    if (await bcrypt.compare(password, user.password)) {
      const token = generateAuthToken({ _id: user?._id, email: email });
      user.token = token;
      user.save();

      return res.json({
        success: true,
        status: 200,
        message: "user Logged in",
        data: user,
      });
    }
    return res.json({
      success: false,
      status: 400,
      message: "user credentials are not correct",
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.adminRegister = async (req, res) => {
  try {
    const { email, password, institution } = req.body;
    // if any one of the field from email and password is not filled
    if (!email || !password || institution) {
      return res.json({
        success: false,
        message: "email or password or names is empty",
      });
    }
    req.body.password = await bcrypt.hash(password, 10);

    let finduser = await adminModel.findOne({ email: email });
    if (finduser) {
      return res.json({
        success: false,
        message: "email has been rigistered already",
      });
    } else {
      let user = new adminModel(req.body);
      user.userType = "ADMIN";
      await user.save();

      return res.json({
        success: true,
        message: "user registered successfully",
        data: user,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};
