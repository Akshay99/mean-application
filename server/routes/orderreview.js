var mongoose = require('mongoose');
var OrderReview = require('../models/orderreview');
var config = require('../config');

exports.savereview = function (req, res, next) {
  const orderid = req.body.id;
  const lineItem = req.body.lineitem;
  const review = req.body.review;

  if (!orderid || !lineItem || !review) {
    return res.status(422).send({success: false, message: 'Posted data is not correct or incompleted.'});
  } else {

    // Add new expense
    let orderDetail = new OrderReview({
      orderid: orderid,
      lineitem: lineItem,
      review: review
    });

    orderDetail.save(function (err) {
      if (err) {
        res.status(400).json({success: false, message: 'Error processing request ' + err});
      }

      res.status(201).json({
        success: true,
        message: 'OrderReview saved successfully'
      });
    });

  }
}


exports.getallReviews = function (req, res, next) {
  OrderReview.find({}).exec(function (err, expense) {
    if (err) {
      res.status(400).json({success: false, message: 'Error processing request ' + err});
    }
    res.status(201).json({
      success: true,
      data: expense
    });
  });
}
