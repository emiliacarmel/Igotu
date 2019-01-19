const pg = require('pg');  // postgres library


itemController = {};

itemController.addItem = (req, res, next) => {  
  const uri = 'postgresql://igotu:eyegotchu@igotu-master.cu4n5g8jahnw.us-west-2.rds.amazonaws.com:5432/igotu';
  const pool = new pg.Pool({
    connectionString: uri,
  });
  const query = {
    text: 'INSERT INTO items(photo, price, item_name, item_details, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [req.body.photo, req.body.price, req.body.item_name, req.body.item_details, req.body.created_at]
  }
  pool.query(query.text, query.values, (err, user) => {
    if (err) {
      console.log('Here\'s the error: ' + err);
    } else {
      res.locals.data = user.rows[0];
      next();
    };
  });
};


module.exports = itemController;