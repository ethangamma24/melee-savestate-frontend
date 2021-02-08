const express = require('express');
const router = express.Router();

router.post("/username-exists", (req, res) => {
  console.log(req.body.username);
  res.send('true');
})

module.exports = router;
