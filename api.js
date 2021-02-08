const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post("/username-exists", (req, res) => {
  res.send('false');
})

router.post("/register", (req, res) => {
  let temp = bcrypt.hashSync(req.body.password, 10);
  console.log(bcrypt.compareSync(req.body.password, temp));
  req.body.password = temp;
})

module.exports = router;
