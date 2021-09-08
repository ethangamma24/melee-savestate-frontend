const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const axios = require('axios');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

const DIR = './files/';

let s3 = new AWS.S3();
let now = new Date();
let key = '';
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'savestate-files',
    key: (req, file, cb) => {
      cb(null, this.key);
    }
  })
});

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
    res.send(response.data);
  }).catch( (error) => {
    console.log(error);
  });

})

router.post("/Update-Key", (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(`req body.s3_location: ${req.body.s3_location}`);
  this.key = req.body.s3_location;
  res.send(true);
})

router.post("/SaveState-Upload-File", upload.any(), (req, res) => {
  // TODO: Upload file with this
  // console.log(req.files);
  // console.log(req.body);
  res.send(true);
});

router.post("/SaveState-Upload-File-Metadata", (req, res) => {
  console.log(req.body.data);
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Upload-File', req.body).then( (response) => {
    console.log(response);
    if (response.data != null) { res.send(true); }
    else { res.send(false); }
  }).catch( (error) => {
    console.log(error);
  });
});


router.post("/SaveState-Get-Files-By-Character", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Get-Files-By-Character', { "key_expression": req.body[0], "filter_attributes": req.body[1], "filter_attribute_names": req.body[2], "filter_expression": req.body[3] }).then( (response) => {
    res.send(response.data.Items);
  }).catch( (error) => {
    console.log(error);
  });
})

router.post("/SaveState-Get-Files-By-User", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Get-Files-By-User', req.body).then( (response) => {
    console.log(response.data);
    res.send(response.data);
  }).catch( (error) => {
    console.log(error);
  });
})

router.post("/SaveState-Get-Files-By-Popularity", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Get-Files-By-Popularity', req.body).then( (response) => {
    console.log(response.data);
    res.send(response.data);
  }).catch( (error) => {
    console.log(error);
  });
})


router.get("/SaveState-Download-File", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Download-File', req.query).then( (response) => {
    console.log(response.data);
    // res.send(response.data);
  }).catch( (error) => {
    console.log(error);
  });
  console.log(req.query);
  let S3 = new AWS.S3();
  let params = {
    Bucket: "savestate-files",
    Key: req.query.url
  }
  S3.getObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
      res.send(data.Body);
    }
  })
})


module.exports = router;
