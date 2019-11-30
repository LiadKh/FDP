const mongoose = require('mongoose');

const modelName = require('./models.names').company;
const mongoosePaginate = require('mongoose-paginate-v2');

const {
  Schema,
} = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "company name can't be blank"],
    index: true,
    trim: true,
    minlength: 3,
  },
  managers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "company can't be empty"],
  }],
  technicalEditor: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
}, {
  timestamps: true,
});

companySchema.plugin(mongoosePaginate);

const Company = mongoose.model(modelName, companySchema);

module.exports = Company;
