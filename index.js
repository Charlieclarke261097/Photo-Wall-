//Backendless table API key reference
Backendless.initApp("3F4DF6B3-BD68-2097-FFF1-1E29A6C5EC00","89A5E954-BFC0-5152-FF19-99AB46D7CB00");

//Check that the page has loaded
$(document).on("pageshow","#page2", onPageShow);
function onPageShow() {
console.log("page shown");
}

var destinationType; //used sets what should be returned (image date OR file path to image for example)

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	destinationType=navigator.camera.DestinationType;
}

function capturePhoto() {
    alert("capturePhoto");
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.FILE_URI });
}
	
function onPhotoDataSuccess(imageURI) {
     alert("onPhoto" + imageURI);
    
    
	var image = document.getElementById('myImage');
	image.style.display = 'block';
	image.src = imageURI ;
   localStorage.setItem("imageURI"+imageURI)
    onAddPhoto(imageURI);
	
	var textEntry = prompt("Message");
}

function onFail(message) {
      alert('Failed because: ' + message);
}




    
Backendless.Data.of("Information").find().then(processResults).catch(error);
function processResults(Information) {

$("#images").empty();

//add each photo and text 
    
for(var i = 0; i < Information.length;i++){
    $("#images").append("a href=" + Information[i].fileLocation)
}
	
 
//refresh the table
$("#myImage").content('refresh');

 function error(err){
     console.log("error1 " + err); 
 }

}

//Add photo to backendless table
function onAddPhoto(imageURI) {
alert("AddPhoto");    

    
<<<<<<< HEAD
=======
function gotFileEntry(fileEntry){
    alert("gotFileEntry " + fileEntry);
    fileEntry.file(gotFile,fail);
}
    
function gotFile(fileObject){
    alert("gotFile " + fileObject);
	
	
Backendless.Files.upload(file, "Images", true)
 .then( function( fileURL) {
  })
 .catch( function( error ) {
  });
	
 alert("File Uploadaed " + fileObject);
>>>>>>> parent of f88ff89... 1
}



 
 //Array of variables

var infromation = [
	fileLocation : imageURI;
	Text : textEntry;
	
];



//save array to backendless
 Backendless.Data.of("Information").save(infromation).then(saved).catch(error);

    
