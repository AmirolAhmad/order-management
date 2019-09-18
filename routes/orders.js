var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/setel', {
  useNewUrlParser: true
});

// create order schema
var orderSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  amount: Number,
  status: {
    type: String,
    enum: ['created', 'confirmed', 'delivered', 'cancelled'],
    default: 'created'
  }
});

// compile schema into Model
var Order = mongoose.model('Order', orderSchema);

// get request
router.get('/', function (req, res, next) {
  Order.find(function (err, orders) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err
      });
    } else {
      res.send(orders);
      console.log(orders);
    }
  });
});

// post request
router.post('/new', function (req, res) {
  var newOrder = new Order(req.body);
  newOrder.save(function (err, order) {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: err
      });
    } else {
      console.log(order)
      res.send({
        success: true
      });
    }
  });
})

module.exports = router;