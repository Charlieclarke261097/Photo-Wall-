

//Backendless keys for access to data tables and app
var APPID = "3F4DF6B3-BD68-2097-FFF1-1E29A6C5EC00";
var SECRETKEY = "89A5E954-BFC0-5152-FF19-99AB46D7CB00";

Backendless.initApp( APPID, SECRETKEY);


var destinationType; //used sets what should be returned (image date OR file path to image for example)

document.addEventListener("deviceready",onDeviceReady,false);

// When device is ready navigate to camera
function onDeviceReady() {
	destinationType=navigator.camera.DestinationType;
	
	Backendless.Data.of( "Information" ).find()
                                        .then( function( result ) {
                                            processResults(result);
                                        
                                        })
                                        .catch( function( error ) {
                                        });
        
    

}

//When phot is captured trigger function onPhotoDataSuccess and set destination type of the file to URI
function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality:50,targetWidth:200,targetHeight:200,
    destinationType: window.Camera.DestinationType.FILE_URI
});
}
	
function onPhotoDataSuccess(imageURI) {
	
    
    //Find the local files URL

    window.resolveLocalFileSystemURL(imageURI,gotFileEntry,onFail);
     
}

//File has been recieved
function gotFileEntry(fileEntry){
    console.log("gotFileEntry " + fileEntry);
    fileEntry.file(gotFile,onFail);
}
    
function gotFile(fileObject){
    
   //Take current date of photo taken 
var d = Date.now();
    
	
    // Change the file name to the current date with file type
	
    var filename = d+".jpeg";
	
    
	
    //Read file
    var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            console.log("File Uploaded " + fileObject.fullPath);
            
			//Save the file as a blob of type image/jpg
            var byteArray = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
            //Save file to backendless folder 
			//Save the files URL to the information table in backendless
            Backendless.Files.saveFile( "testfolder", filename, byteArray, true )
                .then( 
                    function( savedFileURL ) {
                  
                        Backendless.Data.of("Information").save({fileLocation:savedFileURL.fileURL})
                            .then(saved).catch(error);
                                function saved(savedImage) {
        
                                    alert( "Your image has been added to the wall!");  
                                    //Process the results in the information table 
                                    Backendless.Data.of( "Information" ).find()
                                        .then( function( result ) {
                                            processResults(result);
                                        
                                        })
                                        .catch( function( error ) {
                                        });
        
                                        }
            
                
                                        }
      )
 .catch( function( error ) {
    alert( "error - " + error.message );
  }); 
        };

        reader.readAsArrayBuffer(fileObject);
    
    
    
    

}
    






function processResults(Information) {
 
//Empty the content 
$("#images").empty();

//add each photo and text 
    
for(var i = 0; i < Information.length;i++){
    $("#images").append("<img src=" + Information[i].fileLocation+">");
}
	
    

	
	




}

//Fail message if file can not be got 
function onFail(message) {
      console.log('Failed because: ' + message);
}

 
 


    
