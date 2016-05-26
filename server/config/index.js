'use strict';

var config = {
  'jwtSecretKey' : process.env.SECRET_TOKEN || 'super-sercret-key',
  'dbName' : 'obbp',
  'cloudinaryCloudName' : process.env.CLOUDINARY_CLOUD_NAME || 'arrc',
  'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY || '614793835855469',
  'cloudinaryApiSecret': process.env.CLOUDINARY_API_SECRET ||  'Km1v5oSmgyW7f4RDgZW4I6_DsVo',
  mailer: {
        from: process.env.MAILER_FROM || 'obbp@arrc.in',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'Mailgun',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'postmaster@mailgun.arrc.in',
                pass: process.env.MAILER_PASSWORD || '248c5f0849bd7127394327de56a6d17e'
            }
        }
    }
};

module.exports = config;
