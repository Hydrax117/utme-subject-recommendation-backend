// const departmentsModel = require("../models/departments");

// module.exports.AddDepartment = async (req, res) => {
//   try {
//     // checking to see if the department is already there
//     const title = req.body.name;
//     let t = await departmentsModel.find({ name: title });
//     if (t == "") {
//       let department = new departmentsModel(req.body);
//       department.save();
//       return res.json({
//         success: true,
//         status: 200,
//         message: "department added successfully",
//         data: department,
//       });
//     } else {
//       return res.json({
//         success: false,
//         status: 400,
//         message: "department already exsit",
//       });
//     }
//   } catch (error) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: error.message,
//     });
//   }
// };
