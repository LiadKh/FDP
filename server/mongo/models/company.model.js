var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "company name can't be blank"],
    index: true,
    trim: true,
    minlength: 3
  },
  managers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  technicalEditor: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true
});
