/********************************************************************************
  STARTING PLACEHOLDER MAPS
********************************************************************************/

var c1 = document.getElementById("map-canvas1");				//First Placeholder
var ctx1 = c1.getContext("2d");

var gradient = ctx1.createLinearGradient(0,0,200,0);
gradient.addColorStop(0,"blue");
gradient.addColorStop(1,"orange");
ctx1.fillStyle = gradient;
ctx1.fillRect(0,0,400,300);

var c2 = document.getElementById("map-canvas2");				//Second Placeholder
var ctx2 = c2.getContext("2d");

var gradient = ctx2.createLinearGradient(0,0,200,100);
gradient.addColorStop(0,"green");
gradient.addColorStop(1,"pink");
ctx2.fillStyle = gradient;
ctx2.fillRect(0,0,400,300);


/********************************************************************************
  GET CURRENT LOCATION 
********************************************************************************/

var lng1, lat1;													//Current Coordinates

function geoLocate(){											//Find current latitude and longitude.
	var msg = 'Sorry, we were unable to find your location.  Please enter it below.';
	var elLoc = document.getElementById("loc");

	if (Modernizr.geolocation) {								//Check GeoLocate Support
		navigator.geolocation.getCurrentPosition(success, fail);
		elLoc.textContent = "Loading your location...";
	} else {
		elLoc.textContent = msg;								//Will write out "Sorry" message if unavailable
	}

	function success(position) {
		lat1 = position.coords.latitude;
		lng1 = position.coords.longitude;						//If position found
		msg = '<h3>Longitude:<br>';
		msg += lng1 + '</h3>';
		msg += '<h3>Latitude:<br>';
		msg += lat1 + '</h3>';
		elLoc.innerHTML = msg;									//Successful message will have lng & lat coords displayed
		console.log(lat1);
		console.log(lng1);

		var elArray = document.getElementsByClassName("mapCheck");	//Removes the warning text from the map buttons
		if (elArray.length > 0) {
			for (var i=0; i<elArray.length; i++) {
				elArray[i].classList.add('alright');
			}
		}	


		return [position.coords.longitude, position.coords.latitude];
	}

	function fail(msg) {										//Displays "Sorry" message if geolocation.getCurrentPosition method fails
		elLoc.textContent = msg;
		console.log(msg.code);
	}
}

var elInitial = document.getElementById("initial");     		//Initial Position Button Listener
elInitial.addEventListener('click', geoLocate, false);

/********************************************************************************
  SET COORDINATES FOR 2ND MAP - 180 DEGREE OFFSET FOR LAT AND LNG COORDINATES
********************************************************************************/

var lng2, lat2;

if (lat1 >= 0) {
	lat2 = lat1 - 180;
} else {
	lat2 = lat1 + 180;
}

if (lng1 >= 0) {
	lng2 = lng1 - 180;
} else {
	lng2 = lng1 + 180;
}

/********************************************************************************
  GET CURRENT MAP 
********************************************************************************/

function initMaps() {
	ctx1.clearRect(0,0,400,300);								//Clear placeholder from canvas
	ctx2.clearRect(0,0,400,300);
	loadAPI();												
}

function loadAPI(){
	var script = document.createElement("script");
	script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAlrWS_4TgEjNtZL3X6H_HCD2Ph2CTUcK0&callback=mapLoaded";
	script.type = "text/javascript";
	/*script.async = true;
	script.defer = true; */
	document.getElementsByTagName("head")[0].appendChild(script);
}

function loadMaps() {
	google.load("maps","3",{"callback": mapLoaded});
} 

function mapLoaded() {
	var map1 = new google.maps.Map(document.getElementById('mapDiv1'), {
		zoom: 7,
		center: {lat: 165, lng: -50}
	});

	var map2 = new google.maps.Map(document.getElementById('mapDiv2'), {
		zoom: 7,
		center: {lat: -34.397, lng: 150.644}
	});
}
var elMap1 = document.getElementById("getMaps");     		//Map Button Listener
elMap1.addEventListener('click', initMaps, false);