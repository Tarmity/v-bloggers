const videoElement = $("#videoDiv");

// when click on btn, user's geolocation will show up on page
$(".btn").on("click", function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
  })
  
  function showPosition(position) {
     reset();
     console.log(position.coords);
     const lat = position.coords.latitude;
     const lon = position.coords.longitude;
     $(".find-lat-lon-container").append("<p class='myLocation'>" + "Latitude: " + lat + "<br>" + "Longitude: " + lon + "</p>");
     $("#inputLat").val(lat);
     $("#inputLon").val(lon); 
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
  $("iframe").css("width", "400px");
  $("iframe").css("height","400px");
  $("iframe").css("position", "inherit");
  let frame = $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
  let videoTitle = $('h3').text(data.items[0].snippet.title)
  let description = $('.description').text(data.items[0].snippet.description)
  console.log(data.items[0].snippet.description);
  videoElement.append(frame);
}

getVideo();

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

  function reset() {
    $(".myLocation").empty();
  }
  