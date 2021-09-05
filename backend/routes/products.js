const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

//* GET ALL PRODUCTS */
router.get('/', function (req, res) {
  let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 5;

  let startValue;
  let endValue;

  if (page > 0) {
      startValue = (page * limit) - limit;
      endValue = page * limit;               
  } else {
      startValue = 0;
      endValue = 10;
  }
  database.table('products as p')
      .join([
          {
              table: "categories as c",
              on: `c.id = p.cat_id`
          }
      ])
      .withFields(['c.title as category',
          'p.title as name',
          'p.price',
          'p.quantity',
          'p.description',
          'p.image',
          'p.id'
      ])
      .slice(startValue, endValue)
      .sort({id: .1})
      .getAll()
      .then(prods => {
          if (prods.length > 0) {
              res.status(200).json({
                  count: prods.length,
                  products: prods
              });
          } else {
              res.json({message: "No products found"});
          }
      })
      .catch(err => console.log(err));
});

/* GET ONE PRODUCT*/
router.get('/:prodId', (req, res) => {
  let productId = req.params.prodId;
  database.table('products as p')
      .join([
          {
              table: "categories as c",
              on: `c.id = p.cat_id`
          }
      ])
      .withFields(['c.title as category',
          'p.title as name',
          'p.price',
          'p.quantity',
          'p.description',
          'p.image',
          'p.id',
          'p.images'
      ])
      .filter({'p.id': productId})
      .get()
      .then(prod => {
          console.log(prod);
          if (prod) {
              res.status(200).json(prod);
          } else {
              res.json({message: `No product found with id ${productId}`});
          }
      }).catch(err => res.json(err));
});


// get all prod from category

router.get('/category/:catName', function(req, res) {

  const cat_title = req.params.catName;

  database.table('products as p')
  .join([{
    table: 'categories as c',
    on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%`
  }])
  .withFields(['c.title as category',
    'p.title as name',
    'p.price',
    'p.quantity',
    'p.image',
    'p.id'
  ])
  .getAll()
  .sort({id: .1})
  .then(prods => {
    if(prods > 0) {
      res.status(200).json({
        count: prods.length,
        products: prods
      });
    } else {
      res.json({message: `no products found from ${cat_title} category.`});
    }
  }).catch(err => {console.log(err)});
})


module.exports = router;
