/********************************************************************************
  STARTING MAP 
********************************************************************************/

function initialize() {
	var mapOptions = {
		center: { lat: -34.397, lng: 150.644},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas1'),mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

/********************************************************************************
  INITIAL POSITION
********************************************************************************/

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

var elInitial = document.getElementById("initial");     		//Initial Position Button Listener
elInitial.addEventListener('click', initialPosition, false);

/********************************************************************************
  INITIAL POSITION
********************************************************************************/