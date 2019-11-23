const mongoose = require('mongoose');

const { Schema } = mongoose;
const modelName = require('./models.names').project;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "project name can't be blank"],
    },
    technicalEditor: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    managers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model(modelName, projectSchema);

module.exports = Project;
