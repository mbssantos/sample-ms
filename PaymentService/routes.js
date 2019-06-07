const express = require('express');
const service = require('./PaymentService');
const router = express.Router({ mergeParams: true });
router.post('/getPayment', (req, res, next) => {
  const user = req.body.user;
  const session = req.body.session;
  if(user && session) 
    service.getUserPayment(user, function(err, price) {
      if(err) {
        err = {'error': err}
        res.json(err);
      } else {
        const resp = {};
        resp.payment = price;
        res.json(resp);
      }
    });
  else 
    res.sendStatus(401);
});

module.exports = router;
