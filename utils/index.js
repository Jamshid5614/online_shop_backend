const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configs/keys");
const multer = require("multer");
const path = require("path");
const {nanoid} = require('nanoid');
const UserModel = require('../models/user');
const adminEmail = require('./adminEmail');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, './uploads/');
    } else {
      cb("picture png/jpeg must be in format");
    }
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});


exports.upload = multer({storage: storage})


exports.checkToken = async function (req, res, next) {
  try {
    const userToken = req.headers["Authorization"].split("Bearer ")[1];
    const userId = jwt.verify(userToken, SECRET_KEY);
    const user = await UserModel.findOne({_id: userId.id});
    if(user.email === adminEmail) {
      req.locals = { ...req.locals, id: userId.id, isAdmin: true };
    } else {
      req.locals = { ...req.locals, id: userId.id, isAdmin: false };
    }
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Unauthorized user" });
  }
};


