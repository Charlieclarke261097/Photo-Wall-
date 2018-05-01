


var APPID = "3F4DF6B3-BD68-2097-FFF1-1E29A6C5EC00";
var SECRETKEY = "89A5E954-BFC0-5152-FF19-99AB46D7CB00";

Backendless.initApp( APPID, SECRETKEY);


var destinationType; //used sets what should be returned (image date OR file path to image for example)

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	destinationType=navigator.camera.DestinationType;
}

function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
    destinationType: window.Camera.DestinationType.FILE_URI
});
}
	
function onPhotoDataSuccess(imageURI) {
	//var image = document.getElementById('image');
	//image.style.display = 'block';
	//image.src = imageURI;
    
    //save file to backendless

    window.resolveLocalFileSystemURL(imageURI,gotFileEntry,onFail);
     
}


function gotFileEntry(fileEntry){
    console.log("gotFileEntry " + fileEntry);
    fileEntry.file(gotFile,onFail);
}
    
function gotFile(fileObject){
    console.log("gotFile " + fileObject);
    
       console.log("File Uploaded " + fileObject.fullPath);
    
    console.log("File Uploaded " + fileObject.type);
    
	 console.log("File Uploaded " + fileObject.size);
	
    console.log("File Uploaded " + fileObject.name);
    
    
    
    var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            console.log("File Uploaded " + fileObject.fullPath);
            
            var byteArray = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
            
            Backendless.Files.saveFile( "testfolder", fileObject.name, byteArray, true )
 .then( function( savedFileURL ) {
    console.log( "file has been saved - " + savedFileURL );
Backendless.Data.of("Information").save(savedFileURL).then(saved).catch(error);
  }
      )
 .catch( function( error ) {
    console.log( "error - " + error.message );
  }); 
        };

        reader.readAsArrayBuffer(fileObject);
    
    
    
    

}
    



function saved(savedImage) {
console.log( "new image has been saved" + savedImage);  
}



function processResults(Information) {
alert("processResults"); 
//Empty the content 
$("#images").empty();

//add each photo and text 
    
for(var i = 0; i < Information.length;i++){
    $("#images").append("<img src=" + Information[i].fileLocation+">");
}
	
    
alert( Information[i].fileLocation)
 
alert("Processed"); 

	
	




}


function onFail(message) {
      console.log('Failed because: ' + message);
}

 
 


    
