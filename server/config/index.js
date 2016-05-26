'use strict';

var config = {
  'jwtSecretKey' : process.env.SECRET_TOKEN ,
  'dbName' : 'obbp',
  'cloudinaryCloudName' : process.env.CLOUDINARY_CLOUD_NAME,
  'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
  'cloudinaryApiSecret': process.env.CLOUDINARY_API_SECRET,
  mailer: {
        from: process.env.MAILER_FROM,
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER,
            auth: {
                user: process.env.MAILER_EMAIL_ID,
                pass: process.env.MAILER_PASSWORD
            }
        }
    }
};

module.exports = config;
