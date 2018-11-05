window.onload = function() {
  document.getElementById("nearestBus").addEventListener("click", getLocation);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

var _eQuatorialEarthRadius = 6378.1370;
var _d2r = (Math.PI / 180.0);
var nearestBus = [];

function showPosition(position) {
    var lat1 = position.coords.latitude;
    var long1 = position.coords.longitude;
    console.log(lat1, long1);
    console.log(BusTime);
    for (i = 0; i < BusTime.length; i++) {
        var lat2 = BusTime[i][4];
        var long2 = BusTime[i][5];

        var dlong = (long2 - long1) * _d2r;
        var dlat = (lat2 - lat1) * _d2r;
        var a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
        var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
        var d = _eQuatorialEarthRadius * c;

        nearestBus.push([d, BusTime[i][3]]);
    }
    console.log(nearestBus);
    nearestBus.sort(function(a, b) {
        return a[0] - b[0];
        //return a - b;
      });
      console.log(nearestBus[0][0]);
    
}


