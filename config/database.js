const mongoose = require("mongoose");

const { DB_CON_STRING } = process.env;

module.exports = () => {
  // mogoose.connect("mongodb://localhost/ecommerce")
  // mogoose.connect("mongodb+srv://abidrazaa:Abcd1234@cluster0.lr2rk.mongodb.net/?retryWrites=true&w=majority")
  //     .then(() => console.log('DB Connection Successfull'))
  //     .catch(err => console.log(err.message))

  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connected to the database!"));
};
