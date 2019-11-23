var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
