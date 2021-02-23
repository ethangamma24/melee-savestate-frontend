const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const axios = require('axios');
const AWS = require('aws-sdk');
const multer = require('multer');

const DIR = './files/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const file_name = file.original_name.toLowerCase().split(' ').join('-');
    cb(null, file_name);
  }
});

let upload = multer({
  storage: storage,
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

router.post("/SaveState-Upload-File", upload.file('file'), (req, res) => {
  // TODO: Upload file with this
  s3.putObject({
    Bucket: 'savestate-files',
    Key: req.body.s3_location,
    Body: req.body.file
  }, (response) => {
    res.send(response);
  });
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

router.post("/SaveState-Download-File", (req, res) => {
  axios.post('https://jzdxxh1tdj.execute-api.us-east-1.amazonaws.com/dev/SaveState-Download-File', req.body).then( (response) => {
    // console.log(response.data);
    res.send(response.data);
  }).catch( (error) => {
    console.log(error);
  });
})


module.exports = router;
