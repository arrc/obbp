'use strict';
var _ = require('lodash');
let chance = require('chance').Chance();
let moment = require('moment');

let issueDate = moment("11/04/2016" ,"DD/MM/YYYY");
var now = moment("17/04/2016" ,"DD/MM/YYYY"); // today
var expiryDate = moment("17/04/2016" ,"DD/MM/YYYY");

var oneDayFromNow = moment(now).add(1,'d');
var twoDaysFromNow = moment(now).add(2,'d');
var threeDaysFromNow = moment(now).add(3,'d');
var fourDaysFromNow = moment(now).add(4,'d');
var fiveDaysFromNow = moment(now).add(5,'d');
var sixDaysFromNow = moment(now).add(6,'d');
var sevenDaysFromNow = moment(now).add(7,'d');
var eightDaysFromNow = moment(now).add(8,'d');
var nineDaysFromNow = moment(now).add(9,'d');
var tenDaysFromNow = moment(now).add(10,'d');
var elevanDaysFromNow = moment(now).add(11,'d');


console.log('Diff now\t', expiryDate.diff(now, 'days'));
// console.log('Diff 1 day\t', expiryDate.diff(oneDayFromNow, 'days'));
// console.log('Diff 2 day\t', expiryDate.diff(twoDaysFromNow, 'days'));
// console.log('Diff 6 day\t', expiryDate.diff(sixDaysFromNow, 'days'));
// console.log('Diff 11 day\t', expiryDate.diff(elevanDaysFromNow, 'days'));

if (now.isBetween(issueDate, expiryDate) || now.isSame(issueDate) || now.isSame(expiryDate)) {
  if(expiryDate.diff(now, 'days') <= 5) {
    console.log('hi', expiryDate.diff(now, 'days'));
  }
} else {
  console.log("Now is not between.");
}
