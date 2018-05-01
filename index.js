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
   localStorage.setItem("imageURI",imageURI);
    	
	alert("Photo saved" + imageURI);
    
    onAddPhoto(imageURI);
}


function onFail(message) {
      alert('Failed because: ' + message);
}

function onAddPhoto(imageURI) {
alert("AddPhoto");  
    
var imageData = (localStorage.imageURI);


 
 //Array of variables

var infromation = {
	fileLocation : imageData,
	
};
    
//save array to backendless
 Backendless.Data.of("Information").save(infromation).then(saved).catch(error);
	




    
 Backendless.Data.of("Information").find().then(processResults).catch(error);
function processResults(Information) {
	
//Empty the content 
$("#images").empty();

//add each photo and text 
    
for(var i = 0; i < Information.length;i++){
    $("#images").append("<img src=" + Information[i].fileLocation+">");
}
	
 

	
	




}   
    
    
    
    



    


function error(err){
     alert(err); 
 }
    



  





    

}




 
 


    
