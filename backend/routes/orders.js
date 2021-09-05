var express = require('express');
var router = express.Router();
const { database } = require('../config/helpers');

/* GET users listing. */
router.get('/', function(req, res) {
 database.table('orders_details as od')
 .join([
   {
     table: 'orders as o',
     on: 'o.id = od.order_id'
   }
 ])
});

/* get single order*/

router.get('/:id', function(req, res) {
  
})

module.exports = router;
