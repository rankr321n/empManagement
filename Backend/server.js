"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
/** TODO
 * /adminlogin endpoint - adminlogindetails collection
 * /userlogin endpoint - userlogindetails collection (FOr ADMIN)
 * /empdetails endpoint - empdetails and list
 * /userdetails endpoint -user details list
 */
var port = 3000;
mongoose.connect("mongodb://localhost:27017/app", { useNewUrlParser: true });
var app = express();
app.use(cors());
app.use(bodyParser.json());
var userSchema = new mongoose.Schema({
    name: String,
    designation: String,
    department: String,
    email: String,
    password: String
});
var userDetailsModel = mongoose.model("userdetails", userSchema, "userdetails");
//Get user details on AdminPage
var adminSchema = new mongoose.Schema({
    username: String,
    password: String
});
var adminModel = mongoose.model("adminlogin", adminSchema, "adminlogin");
app.get("/adminlogin", function (req, res) {
    adminModel
        .find()
        .then(function (users) {
        return res.send(users);
    })["catch"](function (e) {
        return res.send({ message: e.message });
    });
});
app.get("/userdetails", function (req, res) {
    userDetailsModel
        .find()
        .then(function (user) {
        return res.send(user);
    })["catch"](function (e) {
        return res.send({ message: e.message });
    });
});
app.post("/userdetails", function (req, res) {
    var data = req.body;
    console.log(data);
    var userDetailsObj = new userDetailsModel(data);
    userDetailsObj
        .save(data)
        .then(function (user) {
        return res.send(user);
    })["catch"](function (e) {
        return res.send({ message: e.message });
    });
});
var userLoginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
var userLoginModel = mongoose.model("userLoginModel", userLoginSchema, "userlogin");
app.get("/userlogin", function (req, res) {
    userLoginModel.find({}, function (err, users) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        //console.log(users);
        res.json(users);
    });
});
var empSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    location: String,
    gid: String,
    avatar: String,
    id: Number,
    date: Date
});
var empModel = mongoose.model("empdetails", empSchema, "empdetails");
app.get("/empdetails", function (req, res) {
    empModel.find({}, function (err, users) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(users);
        res.json(users);
    });
});
app.post("/empdetails", function (req, res) {
    var data = new empModel(req.body);
    var empobj = new empModel(data);
    empobj.save(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});
//GET EMP BY ID
app.get("/empdetails/:id", function (req, res) {
    var id = req.params.id;
    empModel.findById(id, function (err, users) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(users);
        res.json(users);
    });
});
//Update employee by id
app.patch("/empdetails/:id", function (req, res) {
    var id = req.params.id;
    empModel.findOneAndUpdate(id, req.body, { "new": true }, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});
app.listen(port, function () {
    console.log("Server started on port 3000");
});
