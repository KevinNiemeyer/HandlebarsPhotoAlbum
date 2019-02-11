var albumsData = {};
var photosData = {};

//function to extract the id out of the URL
function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


//helpers are best for formatting data
//expression helpers
//helpers always returns a string
//argument is always a property from your data
Handlebars.registerHelper("capitalizeWords", function(property1) {
//capitalize all words.	
	property1 = property1.replace(/\b\w/g, l => l.toUpperCase())
	return new Handlebars.SafeString("<strong>" + property1 + "</strong>" );
});

//expression helper
Handlebars.registerHelper("formatPhoneNumber", function(property) {
	var phone = property.toString();
	return "(" + phone.substr(0, 3) + ")" + phone.substr(3, 3) + "-" + phone.substr(6, 4);
});

//block helpers: (always start with # in HTML)
Handlebars.registerHelper("makeBold", function(options) {
	//options.fn equals whatever appears between the starting and ending block 
	return new Handlebars.SafeString("<strong>" + options.fn(this) + "</strong>");
});

//block helper
Handlebars.registerHelper("toLower", function(options) {
	return options.fn(this).toLowerCase();
});

Handlebars.registerHelper('equals', function(first, second, options) {
if (first == second) {
return options.fn(this);
}
});

Handlebars.registerHelper('randomPhoto', function(photos) {
	var highNum = photos.length-1;
	var ret = "";
	var tmpArr = [];
	for(var i=0; i<20; i++) {
		var randomNumber = Math.floor((Math.random() * highNum) + 1);
		tmpArr.push(this[randomNumber].id);
		tmpArr.sort((a, b) => a - b);

		ret += "<div class=\"thumbnails\"><img class=\"thumbnail\" src=\"" + this[tmpArr[i]].thumbnailUrl + "\" alt=\"" + this[tmpArr[i]].title + "\"><p>(click to enlarge)</p><p><strong>Title: </strong>" + this[tmpArr[i]].title + "</p><p><strong>Album: </strong>" + albumsData[this[tmpArr[i]].albumId].title + "</div>";
	}
	
	return ret;
});

$(document).ready(function() {
	var photoAlbumTemplate = $("#photo-album-template").html();
	
	var compiledPhotoAlbumTemplate = Handlebars.compile(photoAlbumTemplate);

	$.ajax("./data/photos.json").done(function(photos) {
		photosData = photos;
			
		$(".photo-album-container").html(compiledPhotoAlbumTemplate(photos));

	});

	$.ajax("./data/albums.json").done(function(albums) {
		albumsData = albums;
			
	});
});

