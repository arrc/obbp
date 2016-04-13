'use strict';

let path     = require('path'),
  User       = require(path.resolve('server/models/user.model.js')),
  config     = require(path.resolve('server/config')),
  passport   = require('passport'),
  moment     = require('moment'),
  jwt        = require('jsonwebtoken'),
  colors     = require('colors'),
  _          = require('lodash'),
  cloudinary = require('cloudinary'),
  util       = require('util'),
  async      = require('async'),
  crypto     = require('crypto'),
  shortid    = require('shortid'),
  nodemailer = require('nodemailer');


// 1 - Forgot password.
exports.forgotPassword = function(req, res){
  async.waterfall([
    // A - Generate token.
    function generateToken(done){ console.log("A - Genereate token.");
      crypto.randomBytes(20, function(err, buffer) {
				var token = buffer.toString('hex');
				done(null, token);
			});
    },
    // B - check weather user exists.
    function userVerification(token, done){ console.log("B - check user existence.");
      if (req.body.username) {
				User.findOne({username: req.body.username}, function(err, userDoc) {
					if (!userDoc) {
            done('No account with that username has been found');
					} else {
						userDoc.passwordResetToken = token;
						userDoc.passwordResetTokenExpiry = Date.now() + 3600000; // 1 hour

						userDoc.save(function(err) {
              if(err) {
                done('Error. Please try again.');
              } else {
                done(null, token, userDoc);
              }
						});
					}
				});
			} else {
				done('User not found.');
			}
    },
    // C - prepare template for email.
    function prepareEmailTemplate(token, userDoc, done){ console.log("C - Preparing email template.");
      res.render(path.resolve('server/views/password-reset-token-email'), {
				name: userDoc.fullName,
				url: 'http://' + req.headers.host + '/auth/reset/' + token
			}, function(err, emailHTML) {
        if(err) return done('Error. Please try again later.');
				done(null, emailHTML, userDoc);
			});
    },
    // D - Finally send email.
    function sendEmail(emailHTML, userDoc, done){ console.log("D - Sending email");
      var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: userDoc.email,
				from: config.mailer.from,
				subject: 'Obbp: Password Reset!',
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err, info) { console.log(err, info);
				if (err) return done('Error: please try again later.');
				done(null, 'An email has been sent to ' + userDoc.email + ' with further instructions.');
			});
    }
    // E - Finally
  ], function(err, result){
    if (err) return res.status(400).json({message: err});
    return res.status(200).json({ message: result });
  });
};

// 2 - verify reset token and redirect to password reset form.
exports.verifyResetToken = function(req, res){
  User.findOne({ passwordResetToken: req.params.token, passwordResetTokenExpiry: {	$gt: Date.now()	} }, function(err, user) {
		if (!user) {
			return res.redirect('/#!/password/reset/invalid');
		}

		res.redirect('/#!/password/reset/' + req.params.token);
	});
};

// 3 - Reset password.
exports.resetPassword = function(req, res){
	var newPassword = req.body.newPassword;

  User.findOne({ passwordResetToken: req.params.token,	passwordResetTokenExpiry: {	$gt: Date.now()	}	}, function(err, user) {
    if (!err && user) {
      if (newPassword) {
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;

        user.save(function(err) {
          if (err) {
            return res.status(400).json({message: 'Error changing password. Please try again later.'});
          } else {
            return res.redirect('/#!/login-register');
          }
        });
      } else {
        return res.status(400).json({message: 'Please enter new password.'});
      }
    } else {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }
  });
};
