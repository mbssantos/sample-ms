module.exports = {
  getUserPayment(user, cb) {
    if(user) {
      const tmp = {};
      tmp.username = user;
      tmp.payment = 50000;
      cb(null, tmp);
    } else {
      cb({'error': 'no user'});
    }
  }
};
