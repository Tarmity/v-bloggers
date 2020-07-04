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
  $("#iframe1, #iframe2, #iframe3").css("width", "400px");
  $("#iframe1, #iframe2, #iframe3").css("height", "400px");
  $("#iframe1, #iframe2, #iframe3").css("position", "inherit");

  // to randomised videos
  let randomNum1 = Math.floor(Math.random() * Math.floor(20));
  let randomNum2 = Math.floor(Math.random() * Math.floor(20));
  let randomNum3 = Math.floor(Math.random() * Math.floor(20));

  // prevent duplicating videos
  if (randomNum1 !== randomNum2 !== randomNum3) {
    //for video 1
  $('#iframe1').attr('src', 'https://www.youtube.com/embed/' + data.items[randomNum1].id.videoId);
  $("#vidTitle1").text(data.items[randomNum1].snippet.title);
  $(".description1").text(data.items[randomNum1].snippet.description);

  //for video 2
  $('#iframe2').attr('src', 'https://www.youtube.com/embed/' + data.items[randomNum2].id.videoId);
  $("#vidTitle2").text(data.items[randomNum2].snippet.title);
  $(".description2").text(data.items[randomNum2].snippet.description);

  //for video 3
  $('#iframe3').attr('src', 'https://www.youtube.com/embed/' + data.items[randomNum3].id.videoId);
  $("#vidTitle3").text(data.items[randomNum3].snippet.title);
  $(".description3").text(data.items[randomNum3].snippet.description);
 
  //videoTitleEl.append(videoTitle1);
  //videoDescriptionEl.append(description1)
  } else {
    // if there are repeated videos, run embedVideo function again
    embedVideo(data);
  }
  
}

// Google Map function
function initMap() {
  const myLatlng = {
    lat: -25.363,
    lng: 131.044
  };

  let map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 12,
      center: myLatlng
    });

  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
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

  // find user location on Google map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      // infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
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
      key: 'AIzaSyDycTRQSGnsSR2Nzp45BqQQC1HAJZYtHVg',
      // q: "cats",
      part: 'snippet',
      maxResults: 20,
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