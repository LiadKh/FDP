const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = {
  offset: 0,
};

module.exports = mongoosePaginate;
