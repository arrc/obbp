(function() {
  'use strict';
	var MessageCtrl = function($http, User, Message){
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
      });
    };

    _this.retriveMessage = function(messageId){
      Message.retriveMessage(messageId).then(function(data){
        _this.message = data;
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('MessageCtrl',[
		'$http',
    'User',
    'Message',
		MessageCtrl
	]);
})();
