const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const modelName = require('./models.names').company;

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
}, {
  timestamps: true,
});

companySchema.plugin(mongoosePaginate);

const Company = mongoose.model(modelName, companySchema);

module.exports = Company;
