const mongoose = require('mongoose');

const modelName = require('./models.names').company;
const User = require('./user');
const Project = require('./project');

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

companySchema.statics.deleteCompany = async (companyId) => {
  Company.deleteOne({
    _id: companyId,
  }, (err) => {
    if (err) {
      throw new Error({
        massage: err,
      });
    } else {
      User.deleteMany({
        company: companyId,
      }, (err1) => {
        if (err1) {
          throw new Error({
            massage: err1,
          });
        } else {
          Project.deleteMany({
            company: companyId,
          }, (err2) => {
            if (err2) {
              throw new Error({
                massage: err2,
              });
            }
          });
        }
      });
    }
  });
};

const Company = mongoose.model(modelName, companySchema);

module.exports = Company;
