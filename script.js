// when click on btn, user's geolocation will show up on page
$(".btn").on("click", function getLocation() {
navigator.geolocation.getCurrentPosition(showPosition);
})

function showPosition(position) {
   console.log(position.coords);
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   $(".find-lat-lon-container").append("<p>" + "Latitude: " + lat + "<br>" + "Longitude: " + lon + "</p>");
}

function initMap() {
  var myLatlng = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: myLatlng});

  // Create the initial InfoWindow.
  var infoWindow = new google.maps.InfoWindow(
      {content: 'Click the map to get Lat/Lng!', position: myLatlng});
  infoWindow.open(map);

  // Configure the click listener.
  map.addListener('click', function(mapsMouseEvent) {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
    infoWindow.setContent(mapsMouseEvent.latLng.toString());
    infoWindow.open(map);
  });
}
