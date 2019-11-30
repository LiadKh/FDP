const mongoose = require('mongoose');

const modelName = require('./models.names').project;
const mongoosePaginate = require('mongoose-paginate-v2');

const {
  Schema,
} = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "project name can't be blank"],
  },
  company: {
    unique: true,
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, "company can't be empty"],
  },
}, {
  timestamps: true,
});

projectSchema.plugin(mongoosePaginate);

const Project = mongoose.model(modelName, projectSchema);

module.exports = Project;
