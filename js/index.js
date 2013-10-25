/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};*/

var WARNING = "#FFCC00";
var ERROR = "#FF0000";

document.getElementById("printBTN").disabled=true;

function updateProgress(text, overwrite, color) {
	
	var str = text;
	if(color == WARNING || color == ERROR) {
		str = "<font color='"+color+"'>" + str + "</font>"
	}
	
	if(overwrite) {
		reset();
	}
	document.getElementById("registrationProgressLabel").innerHTML = document.getElementById("registrationProgressLabel").innerHTML + "<br>" + str;
}

function reset() {
	document.getElementById("printBTN").disabled=false;
	document.getElementById("registrationProgressLabel").innerHTML = "Image Information<br>-------------------------<br>";
}


function printImageDetails() {
	document.getElementById("printBTN").disabled=true;
	window.resolveLocalFileSystemURI(uri, function(fileEntry) {
		updateProgress("<b>fileEntry.isFile=</b>" + fileEntry.isFile , false);
		updateProgress("<b>fileEntry.isDirectory=</b>" + fileEntry.isDirectory , false);
		updateProgress("<b>fileEntry.name=</b>" + fileEntry.name , false);
		updateProgress("<b>fileEntry.fullPath=</b>" + fileEntry.fullPath , false);
        fileEntry.file(function (file) {
        	updateProgress("<b>file.name=</b>" + file.name , false);
        	updateProgress("<b>file.fullpath=</b>" + file.fullpath , false);
        	updateProgress("<b>file.type=</b>" + file.type , false);
        	updateProgress("<b>file.lastModifiedDate=</b>" + file.lastModifiedDate , false);
        	updateProgress("<b>file.size=</b>" + file.size , false);
        }, function (error) {
        	updateProgress("Error getting file object. Error Code: " + error.code, false, ERROR);
        }
        );
    }, function(evt) {
    	updateProgress("Error getting fileEntry object. Error Code: " + evt.target.error.code, false, ERROR);
    });
}

function testingLabel() {
	document.getElementById("testLabel").innerHTML = "Test 1 2 3";
}



//var pictureSource;   // picture source
//var destinationType; // sets the format of returned value
var uri;


// Wait for device API libraries to load
//
//document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
/*function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}  */

// Called when a photo is successfully retrieved
//

function onPhotoUriSuccess(imageURI) {
//function onPhotoUriSuccess(mediaFiles) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById(photoID);

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  uri = imageURI;
  smallImage.src = uri;
  reset();
  //smallImage.src = mediaFiles[0].fullPath;
  
	
	/*window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        fileEntry.file(function (file) {
            console.log("File size: " + file.size);
        }, function (error) {
        	alert("Unable to retrieve file properties: " + error.code);
        }
        );
    }, function(message) {
        alert('resolve local file failed');
    });*/
}

/**
 * 
 * @param id photo ID
 * @param data photo data
 * @returns {Boolean}
 */
function updatePhotoID(id, uri) {
	for(var i=0; i<movil_photos.length; i++) {
		if(movil_photos[i].id == id) {
			movil_photos[i].uri = uri
			return true;
		}
	}
	return false;
}

// A button will call this function
//
var photoID ;
function capturePhoto(id) {
	photoID =id;

    document.getElementById(photoID).src = "img/spinner.gif";
    
  // Take picture using device camera and retrieve image as base64-encoded string
    //navigator.device.capture.captureImage(onPhotoUriSuccess, onFail, {limit: 1});
  /*navigator.camera.getPicture(onPhotoUriSuccess, onFail, { quality: 50,
	  	sourceType : Camera.PictureSourceType.CAMERA,
	  	destinationType: Camera.DestinationType.FILE_URI,
	    encodingType: Camera.EncodingType.JPEG,
	    saveToPhotoAlbum: true });*/
  
  navigator.camera.getPicture(onPhotoUriSuccess, onFail, { quality: 100,
	  	sourceType : Camera.PictureSourceType.CAMERA,
	  	destinationType: Camera.DestinationType.FILE_URI,
	    encodingType: Camera.EncodingType.JPEG,
	    targetWidth: 100,
	    targetHeight: 100,
	    saveToPhotoAlbum: true });
}

// Called if something bad happens.
//
function onFail(message) {
    console.log('Failed because: ' + message);
    alert('Failed because: ' + message);
    //Change image back because no photo was retrieved
    document.getElementById(photoID).src = "img/addPhoto.png";
    
}

