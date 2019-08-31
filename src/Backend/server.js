"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var port = 3000;
mongoose.connect("mongodb://localhost:27017/test");
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
var loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});
var adminLoginModel = mongoose.model("adminlogin", loginSchema);
// var userLoginModel = mongoose.model("userlogin", loginSchema);
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.get("/adminlogin", function (req, res) {
    console.log("hi");
    adminLoginModel
        .find()
        .then(function (users) {
        return res.send(users);
    })["catch"](function (e) {
        return res.send({ message: e.message });
    });
});
