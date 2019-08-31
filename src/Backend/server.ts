import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";

let port = 3000;
mongoose.connect("mongodb://localhost:27017/app");

//EMPLOYEE DETAILS MODEL SCHEMA for USER
// let empDetailsSchema = new mongoose.Schema({
//   Name: String,
//   last_name: String,
//   phone: Number,
//   email: String,
//   location: String,
//   gid: String,
//   avatar: String,
//   id: Number,
//   date: Date
// });

// var EmployeeModel = mongoose.model("empDetails", empDetailsSchema);

//User list Visible to Admin

// let userDetailsSchema = new mongoose.Schema({
//   first_name: String,
//   Designation: String,
//   Department: String
// });

//var UserModel = mongoose.model("userdetails", userDetailsSchema);

//LOGIN SCHEMA
let loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

var adminLoginModel = mongoose.model("adminlogin", loginSchema);

// var userLoginModel = mongoose.model("userlogin", loginSchema);

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/adminlogin", (req, res) => {
  console.log("hi");
  adminLoginModel
    .find()
    .then(users => {
      return res.send(users);
    })
    .catch(e => {
      return res.send({ message: e.message });
    });
});

app.listen(3000, () => {
  console.log("SERVER ON PORT 3000 hi");
});
