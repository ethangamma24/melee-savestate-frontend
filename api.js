const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const axios = require('axios');

router.post("/username-exists", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/username-exists', req.body).then( (response) => {
    res.send(response.data.body);
  }).catch( (error) => {
    console.log(error);
  });
})

router.post("/SaveState-Email-Exists", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Email-Exists', req.body).then( (response) => {
    res.send(response.data.body);
  }).catch( (error) => {
    console.log(error);
  });
})

router.post("/register", (req, res) => {
  let password = bcrypt.hashSync(req.body.password, 10);
  let token = bcrypt.hashSync(req.body.email, 10);
  console.log(bcrypt.compareSync(req.body.password, password));
  req.body.password = password;
  req.body.token = token;

  console.log(req.body);

  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Register-Users', req.body).then( (response) => {
    res.send(response.data.body);
  }).catch( (error) => {
    console.log(error);
  });

})

router.post("/login", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Get-User', { "email": req.body.email }).then( (response) => {
    if (response.data.Item) {
      bcrypt.compare(req.body.password, response.data.Item.password.S).then( (result) => {
        res.send(result);
      });
    } else {
      res.send(null);
    }
  }).catch( (error) => {
    console.log(error);
  });

})

router.post("/SaveState-Get-User", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Get-User', { "email": req.body.email }).then( (response) => {
    if (response.data.Item) { res.send(response.data.Item); }
    else { res.send(null); }
  }).catch( (error) => {
    console.log(error);
  });

})

router.post("/SaveState-Check-Token", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Check-Token', req.body).then( (response) => {
    console.log(response.data);
    res.send(response.data);
  }).catch( (error) => {
    console.log(error);
  });

})

module.exports = router;
