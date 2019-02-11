/*var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
*/

// Get the modal
var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");
var titleCaptionText = document.getElementById("titleCaptionText"); 
var albumCaptionText = document.getElementById("titleCaptionText"); 
// When the user clicks on the button, open the modal 

document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'thumbnail' ) ) {
    	var img = event.target.src;
    	var caption = event.target.alt;
        modal.style.display = "block";
        modalImg.src = img;
        titleCaptionText.innerHTML = '<strong>Title: </strong>' + caption;
    }
}, false);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}