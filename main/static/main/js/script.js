// map object
var map;
// finds the lat longs
var geocoder;
// stores all shapes
var markers = [];

// intialize everything
function initialize() {
  geocoder = new google.maps.Geocoder();
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(37.886436490787712, -121.2685546875),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
}

// initialize the map
google.maps.event.addDomListener(window, 'load', initialize);

// plots the source on the map and then calls the callback with the lat long
function codeAddress(source, callback) {
  var address = document.getElementById(source).value;
  geocoder.geocode({
    'address': address
  }, function (results, status) {
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

// form
var a_latLng, b_latLng;
var a_done, b_done;

$("#ab-form").submit(function (e) {
  setAllMap(null);
  a_done = false;
  b_done = false;
  codeAddress("ab-form-a", a_done_func);
  codeAddress("ab-form-b", b_done_func);
  return false;
});

// sets the lat long of a and checks if both a and b are done
function a_done_func(latLng) {
  a_latLng = latLng;
  a_done = true;
  bothDone();
}

// sets of the lat long of b and checks if both a and b are done
function b_done_func(latLng) {
  b_latLng = latLng;
  b_done = true;
  bothDone();
}

// if both are done, draw the line between a and b then calls fxn
// that draws polygons between a and b
function bothDone() {
  if (a_done && b_done) {
    var coordinates = [
        a_latLng,
        b_latLng,
      ];
    var path = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: '#9933CC',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    path.setMap(map);
    markers.push(path);
    drawPolygons(a_latLng, b_latLng);
  }
}

// draw the polygons that intersect the line between a and b
function drawPolygons(a, b) {
  // B is long, k is lat
  var start = a['B'] + "," + a['k'];
  var end = b['B'] + "," + b['k'];
  $.ajax({
    url: "/get-intersections/" + start + "/" + end + "/",
    beforeSend: function (xhr) {
      // show the spinner and hide the zipcode div
      $("#zipcodes").hide();
      $("#spinner").show();
    },
    success: function (result) {
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
      // hide the spinner and show the zipcode div with the zipcodes
      $("#spinner").hide();
      $("#zipcodes").show();
      $("#zipcodes").text(zips.join(", "));
    }
  });
}