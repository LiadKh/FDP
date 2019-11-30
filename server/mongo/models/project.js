const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const modelName = require('./models.names').project;

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
    index: true,
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, "company can't be empty"],
  },
}, {
  timestamps: true,
  autoIndex: true,
});

projectSchema.plugin(mongoosePaginate);

const Project = mongoose.model(modelName, projectSchema);

module.exports = Project;
