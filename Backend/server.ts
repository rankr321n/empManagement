import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";

/** TODO
 * /adminlogin endpoint - adminlogindetails collection
 * /userlogin endpoint - userlogindetails collection (FOr ADMIN)
 * /empdetails endpoint - empdetails and list
 * /userdetails endpoint -user details list
 */

let port = 3000;
mongoose.connect("mongodb://localhost:27017/app", { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

let userSchema = new mongoose.Schema({
  name: String,
  designation: String,
  department: String,
  email: String,
  password: String
});

var userDetailsModel = mongoose.model("userdetails", userSchema, "userdetails");

//Get user details on AdminPage
let adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

var adminModel = mongoose.model("adminlogin", adminSchema, "adminlogin");
app.get("/adminlogin", (req, res) => {
  adminModel
    .find()
    .then(users => {
      return res.send(users);
    })
    .catch(e => {
      return res.send({ message: e.message });
    });
});
app.get("/userdetails", (req, res) => {
  userDetailsModel
    .find()
    .then(user => {
      return res.send(user);
    })
    .catch(e => {
      return res.send({ message: e.message });
    });
});

app.post("/userdetails", (req, res) => {
  var data = req.body;
  console.log(data);

  var userDetailsObj = new userDetailsModel(data);
  userDetailsObj
    .save(data)
    .then(user => {
      return res.send(user);
    })
    .catch(e => {
      return res.send({ message: e.message });
    });
});

let userLoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

var userLoginModel = mongoose.model(
  "userLoginModel",
  userLoginSchema,
  "userlogin"
);

app.get("/userlogin", (req, res) => {
  userLoginModel.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    //console.log(users);
    res.json(users);
  });
});

let empSchema = new mongoose.Schema({
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

app.get("/empdetails", (req, res) => {
  empModel.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(users);
    res.json(users);
  });
});

app.post("/empdetails", (req, res) => {
  let data = new empModel(req.body);
  let empobj = new empModel(data);
  empobj.save((err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
});

//GET EMP BY ID
app.get("/empdetails/:id", (req, res) => {
  let id = req.params.id;
  empModel.findById(id, (err, users) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(users);
    res.json(users);
  });
});

//Update employee by id
app.patch("/empdetails/:id", (req, res) => {
  let id = req.params.id;
  empModel.findOneAndUpdate(id, req.body, { new: true }, (err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});
