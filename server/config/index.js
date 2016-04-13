'use strict';

var config = {
  'jwtSecretKey' : 'super-sercret-key',
  'dbName' : 'obbp',
  'cloudinaryCloudName' : 'arrc',
  'cloudinaryApiKey': '614793835855469',
  'cloudinaryApiSecret': 'Km1v5oSmgyW7f4RDgZW4I6_DsVo',
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
