const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configs/keys");
const adminEmail = require("../utils/adminEmail");
const ShoppingCartModel = require('../models/shoppingCart');

exports.Login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);

  const { error } = validationResult;

  if (error)
    return res
      .status(400)
      .send({
        success: false,
        errorMsg: `${error.details[0].message.replace(/['"','\']/g, "")}`,
      });

  const findedUser = await UserModel.findOne({ email: req.body.email });
  if (!findedUser)
    return res
      .status(404)
      .json({ success: false, errorMsg: "Email or Passwort is wrong" });

  const comparedPassword = await bcrypt.compare(
    req.body.password,
    findedUser.password
  );
  if (!comparedPassword)
    return res
      .status(400)
      .json({ success: false, errorMsg: "Email or password is wrong" });

  const token = jwt.sign({ id: findedUser._id }, SECRET_KEY);

  res.json({
    token,
    user: findedUser,
  });
};

exports.SignUp = async (req, res) => {
  const data = validateWithJoi(req.body);

  if (!data.success) return res.status(400).json(data);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.payload.password, salt);
  const isOldUser = await UserModel.findOne({ email: req.body.email });

  if (isOldUser)
    return res
      .status(400)
      .json({ success: false, errorMsg: "This email already registered" });

  if (req.body.email === adminEmail) {
    const newUser = await UserModel.create({
      ...data.payload,
      password: hashedPassword,
      isAdmin: true,
    });
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY);

    res.json({
      token,
      user: newUser,
    });
  } else {
    const {} = await ShoppingCartModel.create({});
    const newUser = await UserModel.create({
      ...data.payload,
      password: hashedPassword,
      isAdmin: false,
    });
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY);

    res.json({
      token,
      user: newUser,
    });
  }
};

function validateWithJoi(data) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  const validationResult = schema.validate(data);
  const { error } = validationResult;

  if (error)
    return {
      success: false,
      errorMsg: `${error.details[0].message.replace(/['"','\']/g, "")}`,
    };

  return { success: true, payload: data };
}
