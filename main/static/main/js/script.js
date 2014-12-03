var map;
var geocoder;
var markers = [];

function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(24.886436490787712, -70.2685546875),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

}

function codeAddress(source, callback) {
    var address = document.getElementById(source).value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        addMarker(results[0].geometry.location);
        var loc = results[0].geometry.location;
        callback(loc);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}

// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

// form

var a_latLng, b_latLng;
var a_done, b_done;

$("#ab-form").submit(function(e) {
  setAllMap(null);
  a_done = false;
  b_done = false;
  codeAddress("ab-form-a", a_done_func);
  codeAddress("ab-form-b", b_done_func);
  return false;
});

function a_done_func(latLng) {
  a_latLng = latLng;
  a_done = true;
  bothDone();
}

function b_done_func(latLng) {
  b_latLng = latLng;
  b_done = true;
  bothDone();
}

function bothDone() {
  if (a_done && b_done) {
        var flightPlanCoordinates = [
        a_latLng,
        b_latLng,
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#9933CC',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      flightPath.setMap(map);
      markers.push(flightPath);
      drawPolygons(a_latLng, b_latLng);
  }
}
var objs;
function drawPolygons(a, b) {
  // B is long, k is lat
  var start = a['B'] + "," + a['k'];
  var end = b['B'] + "," + b['k'];
  $.ajax({
    url: "/get-intersections/" + start + "/" + end + "/",
    beforeSend: function(xhr) {
      console.log('hi');
      $("#zipcodes").hide();
      $("#spinner").show();
    },
    success: function(result) {
      console.log("finish");
      objs = result;
      zips = []
      console.log(result);
      for (var zip_code in result) {
        zips.push(zip_code);
        var latLngs = result[zip_code];
        var coords = [];
        for (var latLng in latLngs) {
          coords.push(new google.maps.LatLng(latLngs[latLng]['lat'], latLngs[latLng]['long']));
        }
        // Construct the polygon.
        var poly = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        poly.setMap(map);
        markers.push(poly);
      }
      $("#spinner").hide();
      $("#zipcodes").show();
      $("#zipcodes").text(zips.join(", "));
    }
  });
}