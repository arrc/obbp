(function() {
  'use strict';
	var UserCtrl = function($http, $state, $window, $timeout, State, User, Auth, ngNotify, FileUploader, Upload, Camp){
		var _this = this;
    var token = Auth.getToken();

    _this.camps = []; // all local camps
  // State
    _this.states = State.state();
    _this.user = {};
    _this.profileData = {};

    User.profile().then(function(data){
      console.log(data);
      _this.user = data;
      _this.profileData = data;
    }, function(error){
      console.error(error);
    });

    // retrive local camps
    Camp.retriveLocalCamps().then(function(data){
      _this.camps = data;
      console.log('Camps: \t', _this.camps);
    }, function(error){
      console.error(error);
    });

    _this.profileUpdate = function(){
      User.profileUpdate(_this.profileData).then(function(data){
        console.log('User updated data \t',data);
        $state.go('profile');
        ngNotify.set("Profile update successfully", "success");
      }, function(error){
        console.error(error);
        ngNotify.set("Failed to update profile.", "error");
      });
    };

    _this.changePassword = function(){
      User.changePassword(_this.changePasswordData).then(function(data){
        console.log('Password changed successfully. \t',data);
        $state.go('profile');
        ngNotify.set("Password changed successfully.", "success");
      }, function(error){
        console.error(error);
        ngNotify.set("Failed to change password.", "error");
      });
    };

    _this.forgotPassword = function(){
      User.forgotPassword(_this.forgotPasswordData).then(function(message){
        ngNotify.set(message, "success");
      }, function(error){
        ngNotify.set(error, "error");
      });
    };

    _this.uploader = new FileUploader({
      url: '/upload',
      withCredentials: true
    });

    // Set file uploader image filter
		_this.uploader.filters.push({
			name: 'imageFilter',
			fn: function (item, options) {
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		});

    // Called after the user selected a new picture file
		_this.uploader.onAfterAddingFile = function (fileItem) {
			if ($window.FileReader) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(fileItem._file);

				fileReader.onload = function (fileReaderEvent) {
					$timeout(function () {
						_this.imageURL = fileReaderEvent.target.result;
					}, 0);
				};
			}
		};

    // Called after the user has successfully uploaded a new picture
		_this.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      console.log('Done uploading image', fileItem, response, status);
		};

    // Called after the user has failed to uploaded a new picture
		_this.uploader.onErrorItem = function (fileItem, response, status, headers) {
			console.error('Failed uploading image', fileItem, response, status, headers);
		};

    _this.startUploading = function(){
      _this.uploader.uploadAll();
    };

    /* ng upload */
    _this.ngUpload = function(file){
      file.upload = Upload.upload({
        url: '/api/profile/image',
        data: {file: file},
        file: file,
        headers: {'Authorization': 'Bearer ' + token},
        withCredentials: true
      });

      file.upload.then(function(res){
        $timeout(function () {
          file.result = res.data;
          console.log(res);
        });
      }, function(res){
        console.log(res);
      });
    };


	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('obbp').controller('UserCtrl',[
		'$http',
    '$state',
    '$window',
    '$timeout',
    'State',
    'User',
    'Auth',
    'ngNotify',
    'FileUploader',
    'Upload',
    'Camp',
		UserCtrl
	]);
})();
