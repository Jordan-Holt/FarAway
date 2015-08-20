function initialPosition(e) {									//Call geolocate() from geolocate.js
	e.preventDefault();
	geoLocate();
}

function geoLocate(){
	var msg = 'Sorry, we were unable to find your location.  Please enter it below.';
	var elLoc = document.getElementById("loc");

	if (Modernizr.geolocation) {									//Check Geo Support
		navigator.geolocation.getCurrentPosition(success, fail);
		elLoc.textContent = "Loading your location...";
	} else {
		elLoc.textContent = msg;
	}

	function success(position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;									//If position found
		msg = '<h3>Longitude:<br>';
		msg += lon + '</h3>';
		msg += '<h3>Latitude:<br>';
		msg += lat + '</h3>';
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

function initialize () {															//Initialize first map
	var mapOptions = {
		zoom : 8,
		center : new google.maps.LatLng(lat,lon)
	};

	var map = new google.maps.Map(document.getElementById('map1'),mapOptions);
}

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&signed_in=true&callback=initialize';
	document.body.appendChild(script);
}

function initialize2 () {										//Initialize second map

	lat2 = lat + 180;											//180 degree offset
	if (lat2 >= 180) {
		lat2 = -180 + (lat2 - 180);
		lat2 = lat2;
	}

	lon2 = lon + 180;
	if (lon2 >= 180) {
		lon2 = -180 + (lon2 - 180);
		lon2 = lon2;
	}

	var mapOptions = {
		zoom : 8,
		center : new google.maps.LatLng(lat2,lon2)
	};
	console.log("Lat2: " +lat2+" Lon2: "+lon2);

	var map = new google.maps.Map(document.getElementById('map2'),mapOptions);
}

var lat;
var lon;
var lat2;
var lon2;

var elInitial = document.getElementById("initial");     		//Initial Position Button Listener
elInitial.addEventListener('click', initialPosition, false);

var elInitialMap = document.getElementById("getMap");     		//Initial Position Button Listener
elInitialMap.addEventListener('click', loadScript, false);

var elInitialMap2 = document.getElementById("getMap2");     	//Final Position Button Listener
elInitialMap2.addEventListener('click', initialize2, false);