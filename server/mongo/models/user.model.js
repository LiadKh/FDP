const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const modelName = require('./models.names').user;

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 3,
        required: [true, "first name can't be blank"],
      },
      last: {
        type: String,
        lowercase: true,
        trim: true,
        minlength: 3,
        required: [true, "last name can't be blank"],
      },
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email can't be blank"],
      index: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false,
      },
    },
    password: {
      type: String,
      unique: true,
      required: [true, "password can't be blank"],
      index: true,
      trim: true,
      minlength: 3,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model(modelName, userSchema);

module.exports = User;
