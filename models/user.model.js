const mongoose = require("mongoose");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    _id: { type: String, default: v4 },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "author", "contributor"],
        message: "Please select your role",
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (enterPassword) {
  return bcrypt.compareSync(enterPassword, this.password);
};

userSchema.methods.jwtToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, "random string", {
    expiresIn: "1h",
  });
};

const User = model("User", userSchema);

module.exports = User;
