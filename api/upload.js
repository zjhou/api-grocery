const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'images-repo',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, req.body.type || undefined);
    },
    key: function (req, file, cb) {
      cb(null, `${req.body.id}` || file.originalname);
    }
  })
}).single('file');

const { cors } = require('./z-blog/utils.js');

const handler = (req, res) => {
  upload(req, res, (err, ...rest) => {
    if(err) {
      console.log('---');
      console.log(process.env.AWS_KEY, process.env.AWS_SECRET);
      console.log('---');
      res.json({
        error: err
      }).end();
      return;
    }
    res.json({
      error: null,
    }).end();
  })
};

module.exports = cors(handler);
