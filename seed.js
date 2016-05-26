'use strict';
require('dotenv').config();
let config = require('./server/config'),
path       = require('path'),
_          = require('lodash'),
async      = require('async'),
moment     = require('moment'),
mongoose    = require('mongoose'),
chance      = require('chance').Chance(),
states      = require('./server/config/states.js'),
argv        = require('yargs').argv,
loremHipsum = require('lorem-hipsum'),
User        = require(path.join(__dirname, "server", "models", "user.model.js")),
Camp        = require(path.join(__dirname, "server", "models", "camp.model.js")),
Request     = require(path.join(__dirname, "server", "models", "request.model.js")),
Message     = require(path.join(__dirname, "server", "models", "message.model.js"));

/*=============================================>>>>>
= Users =
===============================================>>>>>*/
var usersArray = [
  {username: 'admin', email: 'naveen@arrc.in', password: 'admin', firstName: 'Naveen', lastName: 'Kumar', mobile: 95345342342, address: '23-rew, rwo4234, delhi', state: 'Delhi', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'male', bloodGroup: 'A+', weight: 23, isActive: true, isAdmin: true },
  {username: 'neha', email: 'neha@arrc.in', password: 'admin', firstName: 'Neha', lastName: 'Singh', mobile: 95345342342, address: '23-rew, rwo4234, Maharashtra', state: 'Maharashtra', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'female', bloodGroup: 'A+', weight: 23, isActive: true, isAdmin: false },
  {username: 'ram', email: 'ram@arrc.in', password: 'admin', firstName: 'Ram', lastName: 'Kumar', mobile: 95345342342, address: '23-rew, rwo4234, Maharashtra', state: 'Maharashtra', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'male', bloodGroup: 'A+', weight: 23, isActive: true, isAdmin: false },
  {username: 'richa', email: 'richa@arrc.in', password: 'admin', firstName: 'Richa', lastName: 'Thakur', mobile: 95345342342, address: '23-rew, rwo4234, Gujrat', state: 'Gujrat', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'female', bloodGroup: 'A-', weight: 23, isActive: true, isAdmin: false },
  {username: 'amit', email: 'amit@arrc.in', password: 'admin', firstName: 'Amit', lastName: 'Sharma', mobile: 95345342342, address: '23-rew, rwo4234, Gujrat', state: 'Gujrat', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'male', bloodGroup: 'A-', weight: 23, isActive: true, isAdmin: false },
  {username: 'soniya', email: 'soniya@arrc.in', password: 'admin', firstName: 'Soniya', lastName: 'Kaur', mobile: 95345342342, address: '23-rew, rwo4234, delhi', state: 'Delhi', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'female', bloodGroup: 'A-', weight: 23, isActive: true, isAdmin: true },
  {username: 'atul', email: 'atul@arrc.in', password: 'admin', firstName: 'Atul', lastName: 'Singh', mobile: 95345342342, address: '23-rew, rwo4234, delhi', state: 'Delhi', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'male', bloodGroup: 'B+', weight: 23, isActive: true, isAdmin: false },
  {username: 'kirti', email: 'kirti@arrc.in', password: 'admin', firstName: 'Kirti', lastName: 'Yadav', mobile: 95345342342, address: '23-rew, rwo4234, delhi', state: 'Delhi', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'female', bloodGroup: 'O+', weight: 23, isActive: true, isAdmin: false },
  {username: 'ajay', email: 'ajay@arrc.in', password: 'admin', firstName: 'Ajay', lastName: 'Dodiya', mobile: 95345342342, address: '23-rew, rwo4234, Goa', state: 'Goa', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'male', bloodGroup: 'B-', weight: 23, isActive: true, isAdmin: false },
  {username: 'shruti', email: 'shruti@arrc.in', password: 'admin', firstName: 'Shruti', lastName: 'Kumar', mobile: 95345342342, address: '23-rew, rwo4234, Goa', state: 'Goa', pincode: '231211', dateOfBirth: '21-11-1993', gender: 'female', bloodGroup: 'O-', weight: 23, isActive: true, isAdmin: false }
];

_.times(50, function(){
      var name = chance.first();
      var state = states[_.random(0, states.length - 1)];
      var street = chance.street();
      var address = `${street}, ${state}`;
      var bloodGroupChar = chance.character({pool: 'ABO'});
      var bloodGroupPlusMinus = chance.character({pool: '-+'});
      var bloodGroupFull = (`${bloodGroupChar}${bloodGroupPlusMinus}`);
      usersArray.push({
        username: name.toLowerCase(),
        email: chance.email(),
        firstName: name,
        lastName: chance.last(),
        password: 'admin',
        mobile: chance.phone({ country: "uk", mobile: true }),
        address: address,
        state: state,
        pincode: chance.zip(),
        dateOfBirth: chance.birthday({string: true, american: false}),
        gender: chance.gender(),
        bloodGroup: bloodGroupFull,
        weight: chance.integer({min: 50, max: 180}),
        isActive: chance.bool(),
        isAdmin: false
    });
});

/**
 *
 * create
 *
 */
 if(process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
   let dbUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds013908.mlab.com:13908/obbp`;
   mongoose.connect(dbUrl, function(err){
     if(err) {
       console.error('\x1b[31m', 'Could not connect to mLab database!');
       console.log(err);
     }
   });
 } else {
   mongoose.connect('mongodb://localhost/obbp', function(err){
     if(err) {
       console.error('\x1b[31m', 'Could not connect to MongoDB!');
       console.log(err);
     }
   });
 }

mongoose.connection.once('open', function callback() {
  let usersList, requestsArray = [], campsArray = [];
  if (argv.force) {
    async.series({
      /*=============================================>>>>>
      = 1 - Drop database =
      ===============================================>>>>>*/

      dropDatabase: function(done){
        mongoose.connection.db.dropDatabase(function(err, result) {
          console.log('deleted database');
          done(null);
        });
      },

      /*= End of Drop database =*/
      /*=============================================<<<<<*/

      /*=============================================>>>>>
      = 2 - Create users =
      ===============================================>>>>>*/

      createUsers: function(done){
        User.create(usersArray, function(err, docs){
          if (err) return done(err);
          usersList = docs; console.log('created users.');
          done(null);
        });
      },

      /*= End of Create users =*/
      /*=============================================<<<<<*/

      /*=============================================>>>>>
      = 3- Make Request. =
      ===============================================>>>>>*/

      makeRequestsArray: function(done){
        let customMessagesArray = [
          {purpose: 'Need some blood urgently', message: 'A firend of mine suffered an accident and need some blod of group A urgently.'},
          {purpose: 'I need O+ in mumbai', message: 'My wife is sick and she needs blood for operation.'},
          {purpose: 'Operation', message: 'I need blood for operation.'},
          {purpose: 'Blood tranfusion', message: 'A friend has a requirement for a blood group of A+ because he need to undergo blood tranfusion.'},
          {purpose: 'Major accident', message: 'A person got hit by truck and he needs blood.'},
          {purpose: 'Shortage of blood.', message: 'I have shortage of blood that is why need blood.'}
        ];

        _.times(30, function(){
          customMessagesArray.push({purpose: loremHipsum({sentenceUpperBound: 10}), message: loremHipsum({units: 'paragraphs', paragraphUpperBound: 2})});
        });

        _.times(50, function(i){
          let tempUser = usersList[_.random(0, usersList.length - 1)];
          let tempPurpose = customMessagesArray[_.random(0, customMessagesArray.length - 1)].purpose;
          let tempMessage = customMessagesArray[_.random(0, customMessagesArray.length - 1)].message;
          requestsArray.push({
            bloodGroup: tempUser.bloodGroup,
            state: tempUser.state,
            user: tempUser._id,
            purpose: tempPurpose,
            message: tempMessage,
          });
        });

        done(null);

      },

      /*= End of Make Request. =*/
      /*=============================================<<<<<*/

      /*=============================================>>>>>
      = 4- Create Requests. =
      ===============================================>>>>>*/

      createRequests: function(done){
        Request.create(requestsArray, function(err, docs){
          if (err) return done(err);
          console.log('Blood request created.');
          done(null);
        });
      },

      /*= End of Create Requests. =*/
      /*=============================================<<<<<*/

      /*=============================================>>>>>
      = 5- Make camp data =
      ===============================================>>>>>*/

      makeCamp: function(done){
        let customCampsArray = [
          {title: "Blood donation drive in your area this weekend."},
          {title: "There will be a blood donation camp on 15 aug."},
          {title: "Come together this republic day and donate blood."},
          {title: "Donate blood this month."},
          {title: "Every blood counts."},
          {title: "Do participate in blood doantion camp."},
          {title: "Blood donation for a cause."},
          {title: "Kailash hospital is organizing a blood donation camp."},
          {title: "Sharda hospital is inviting you to participate in the upcoming blood donation camp."},
          {title: "Yatharth hospital is organizing a blood donation drive in your area."}
        ];

        _.times(40, function(){
          customCampsArray.push({title: loremHipsum({sentenceUpperBound: 10}), description: loremHipsum({units: 'paragraphs', paragraphUpperBound: 1})});
        });

        _.times(50, function(i){
          let date = chance.date({ year: 2016 ,string: true, american: false});
          let time = `${chance.hour()}:${chance.minute()}:${chance.ampm()}`;
          let datetime = moment(date + " " + time, "DD/MM/YYYY hh:mm:a").toISOString();
          let state = states[_.random(0, states.length - 1)];
          let street = chance.street();
          let address = `${street}, ${state}`;
          let tempTitle = customCampsArray[_.random(0, customCampsArray.length - 1)].title;
          let tempDescription = customCampsArray[_.random(0, customCampsArray.length - 1)].description;
          campsArray.push({
            state: state,
            title: tempTitle,
            description: tempDescription,
            address: address,
            datetime: datetime,
          });
        });

        done(null);
      },

      /*= End of Make camp data =*/
      /*=============================================<<<<<*/

      /*=============================================>>>>>
      = 6- Create camps. =
      ===============================================>>>>>*/

      createCamps: function(done){
        Camp.create(campsArray, function(err, docs){
          if (err) return done(err);
          console.log('camp created.');
          done(null);
        });
      },

      /*= End of Create camps. =*/
      /*=============================================<<<<<*/
    }, function(err, result){
      if(err) {
        console.log('Error: \t', err);
        process.exit();
      } else {
        console.log('Operation successfull.');
        process.exit();
      }
    }); // async
  }
});
