(function() {
  'use strict';
	var MessageCtrl = function($http, ngNotify, User, Message){
		var _this = this;
    _this.messages = [];
    _this.message = {};

    _this.sendMessage = function(){
      Message.sendMessage(_this.messageData).then(function(data){
        _this.results = data;
      });
    };

    _this.retriveMessages = function(){
      Message.retriveMessages().then(function(data){
        _this.messages = data;
      }, function(error){
        console.log(error);
        ngNotify.set(error.message, "error");
      });
    };

    _this.retriveMessage = function(messageId){
      Message.retriveMessage(messageId).then(function(data){
        _this.message = data;
      });
    };

    _this.deleteMessage = function(message){
      var index = _this.messages.indexOf(message);
      Message.deleteMessage(message._id).then(function(){
        _this.messages.splice(index, 1);
        ngNotify.set('Message deleted successfully ', 'error');
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('MessageCtrl',[
		'$http',
    'ngNotify',
    'User',
    'Message',
		MessageCtrl
	]);
})();
