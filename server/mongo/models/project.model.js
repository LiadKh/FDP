var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let modelName = require('./models.names').project

var projectSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "project name can't be blank"]
  },
  technicalEditor: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  managers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  updated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

var Project = mongoose.model(modelName, projectSchema);

module.exports = Project;
