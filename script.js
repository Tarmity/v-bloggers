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


























//When user inputs Geo location and request YouTube videos from that area.
function getVideo() {
   $.ajax({
     type: 'GET',
     url: 'https://www.googleapis.com/youtube/v3/search',
     data: {
         key: 'AIzaSyComYFtYUNS-PUesGzlGOhRZIuuy0usQSs',
         q: "cats",
         part: 'snippet',
         maxResults: 1,
         type: 'video',
         videoEmbeddable: true,
     },
     success: function(data){
         embedVideo(data)
     },
     error: function(response){
         console.log("Request Failed");
     }
   });
 }

//embed video
 function embedVideo(data) {
   $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
   $('h3').text(data.items[0].snippet.title)
   $('.description').text(data.items[0].snippet.description)
}

getVideo();