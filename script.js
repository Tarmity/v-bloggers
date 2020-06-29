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
