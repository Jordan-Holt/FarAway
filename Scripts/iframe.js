function initialPosition(e) {									//Call geolocate() 
	geoLocate();
}

function geoLocate(){											//Find current latitude and longitude.
	var msg = 'Sorry, we were unable to find your location.  Please enter it below.';
	var elLoc = document.getElementById("loc");

	if (Modernizr.geolocation) {									//Check Geo Support
		navigator.geolocation.getCurrentPosition(success, fail);
		elLoc.textContent = "Loading your location...";
	} else {
		elLoc.textContent = msg;
	}

	function success(position) {
		lat1 = position.coords.latitude;
		lon1 = position.coords.longitude;									//If position found
		msg = '<h3>Longitude:<br>';
		msg += lon1 + '</h3>';
		msg += '<h3>Latitude:<br>';
		msg += lat1 + '</h3>';
		elLoc.innerHTML = msg;
		console.log(lat);
		console.log(lon);
		return [position.coords.longitude, position.coords.latitude];
	}

	function fail(msg) {
		elLoc.textContent = msg;
		console.log(msg.code);
	}
}

function getMap1 () {
	var map = new google.maps.MAP(document.getElementById("map-canvas1"), {
		zoom: 8,
		center: {lat: lat1, lng: lon1}
	});
}



var lat1, lon1, lat2, lon2;

var urlfirst = "https://www.google.com/maps/embed/v1/place?key=";
var ap = "AIzaSyDvBXPE7hZSjBY7hgvHSUQLhHoCekvNzew";

var elInitial = document.getElementById("initial");     		//Initial Position Button Listener
elInitial.addEventListener('click', initialPosition, false);

var elInitialMap = document.getElementById("getMap1");     		//Initial Position Button Listener
elInitialMap.addEventListener('click', getMap1, false);

var elInitialMap2 = document.getElementById("getMap2");     	//Final Position Button Listener
elInitialMap2.addEventListener('click', initialize2, false);