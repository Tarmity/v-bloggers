const videoElement = $("#videoDiv");
const videoTitleEl = $("#video-title");
const videoDescriptionEl = $("#video-description");

// when click on btn, user's geolocation will show up on page
$(".btn").on("click", function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
})

function showPosition(position) {
  reset();
 
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  $(".find-lat-lon-container").append("<p class='myLocation'>" + "Latitude: " + lat + "<br>" + "Longitude: " + lon + "</p>");
  $("#inputLat").val(lat);
  $("#inputLon").val(lon);
}

//embed video
function embedVideo(data) {
  // $("iframe").css("width", "400px");
  // $("iframe").css("height", "400px");
  // $("iframe").css("position", "inherit");

  let frame = $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId);
  let videoTitle = $("<h4>").text(data.items[0].snippet.title);
  let description = $("<p>").text(data.items[0].snippet.description);

  videoElement.append(frame);
  videoTitleEl.append(videoTitle);
  videoDescriptionEl.append(description);
}

// Google Map function
function initMap() {
  var myLatlng = {
    lat: -25.363,
    lng: 131.044
  };

  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: myLatlng
    });

  // Create the initial InfoWindow.
  var infoWindow = new google.maps.InfoWindow({
    content: 'Click the map to get Lat/Lng!',
    position: myLatlng
  });
  infoWindow.open(map);

  // Configure the click listener.
  map.addListener('click', function (mapsMouseEvent) {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng
    });
    infoWindow.setContent(mapsMouseEvent.latLng.toString());
    infoWindow.open(map);
    
    // generate lat and lon and insert in input form
    let mapLat = mapsMouseEvent.latLng.lat();
    let mapLon = mapsMouseEvent.latLng.lng();
    console.log(mapLat);

    reset();

    $("#inputLat").val(mapLat);
    $("#inputLon").val(mapLon);
  });
}

function reset() {
  $(".myLocation").empty();
  $("#inputLat").empty();
  $("#inputLon").empty();
}

// when the user clicked submit
// computer will take the lat and lon in the input form 
// and then generate 5 videos on the page ---> *unfinished*
$(".button").on("click", function findVideos() {
  // empty video title and description div
  $("#video-title").empty();
  $("#video-description").empty();

  // round the latitude and longitude in the form to the next largest integer
  // and turn the value to a string
  let lat = Math.ceil($("input#inputLat").val()).toString();
  let lon = Math.ceil($("input#inputLon").val()).toString();

  // combine lat & lon into 1 string
  let myLocation = lat + "," + lon;

  // convert selected km into a string
  let myKm = ($("option").val()).toString();

  //When user inputs Geo location and request YouTube videos from that area.
  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: 'AIzaSyBjtjIY3nLYY65vNCNfI8DIbnkBbvs5THY',
      // q: "cats",
      part: 'snippet',
      maxResults: 5,
      type: 'video',
      location: myLocation, 
      locationRadius: myKm
      // videoEmbeddable: true,
    },
    success: function (data) {
      embedVideo(data)

    },
    error: function (response) {
      console.log("Request Failed");
    }
  });
})