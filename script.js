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



(function(exports) {
   "use strict";
 
   function initMap() {
     exports.map = new google.maps.Map(document.getElementById("map"), {
       center: {
         lat: -34.397,
         lng: 150.644
       },
       zoom: 8
     });
   }
 
   exports.initMap = initMap;
 })((this.window = this.window || {}));