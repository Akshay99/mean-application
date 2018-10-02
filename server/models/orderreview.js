const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const OrderReview = new Schema({
  orderid: {type: String},
  lineitem: {type: String},
  review: {type: String}
});

OrderReview.plugin(mongoosePaginate);

module.exports = mongoose.model('orderreview', OrderReview, 'orderreview');
