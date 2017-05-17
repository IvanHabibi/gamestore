const jwt = require('jsonwebtoken');
var util = {};



util.isValidAdmin = function(req, res, next) {
  console.log('anjay2');
  console.log(req.headers.token);
    jwt.verify(req.headers.token, 'rahasia', (err, decoded) => {
      console.log('anjay');
      console.log(decoded);
        if (decoded) {
          console.log('anjay3');
            if (decoded.role === 'admin') {
              console.log('masuk');
                next()
            } else {
                res.send('you dont have authorize');
            }
        } else {
            res.send(err)
        }
    })
}

util.isValidUserOrAdmin = function(req, res, next) {
    jwt.verify(req.headers.token, 'rahasia', (err, decoded) => {
        if (decoded) {
            if (decoded.role === 'admin') {
                next()
            } else if (decoded.role === 'user') {
              console.log(decoded.id+' '+req.params.id);
              if(decoded.id === req.params.id){
                next()
              }else{
                res.send('your user dont have authorize');
              }
            } else {
                res.send('you dont have authorize');
            }
        } else {
            res.send(err)
        }
    })
}




module.exports = util;
