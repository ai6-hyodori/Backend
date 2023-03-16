const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const {
  secretAccessKey,
  bucket,
  region,
  accessKeyId,
} = require('../../config/aws.config');

dotenv.config({ path: './.env' });

const s3 = new S3Client({
  secretAccessKey,
  region,
  accessKeyId,
});

const storage = multerS3({
  s3: s3,
  bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read-write',
  key: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    cb(null, Date.now().toString() + extension);
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
