$(document).ready(function () {
  $(".js-search-form").on("submit", searchSpotify);

  // Playback
  $(".js-play-btn").on("click", playOrPause);
  $(".js-audio-tag").on("timeupdate", updateProgressBar);

  // Artist Modal
  $(".js-show-artist").on("click", fetchArtistInfo);

  $(".js-play-btn").removeClass("disabled");
});


function searchSpotify (event) {
  event.preventDefault();

  var searchTerm = $(".js-search-term").val();

  $.ajax({
    type: "GET",
    url: `https://api.spotify.com/v1/search?type=track&query=${searchTerm}`,
    success: updatePlayer,
    error: handleError
  });
}


function handleError (error) {
  console.log("There was an error");
  console.log(error.responseText);
}


function updatePlayer (response) {
  console.log("Search results")
  console.log(response);

  var firstResult = response.tracks.items[0];

  if (firstResult.album.images.length > 0) {
    var imageUrl = firstResult.album.images[0].url;
  }
  else {
    var imageUrl = "https://media.giphy.com/media/1vLHnnIiwUN7a/giphy.gif";
  }

  $(".title").text( firstResult.name );
  $(".author").text( firstResult.artists[0].name );
  $(".cover img").prop( "src", imageUrl );
  $(".js-audio-tag").prop( "src", firstResult.preview_url );

  $(".js-show-artist").data( "artist-url", firstResult.artists[0].href );
}


function playOrPause () {
  $(".js-play-btn").toggleClass("playing");

  if ( $(".js-play-btn").hasClass("playing") ) {
    $(".js-audio-tag").trigger("play");
  }

  else {
    $(".js-audio-tag").trigger("pause");
  }

}


function updateProgressBar () {
  var currentTime = $(".js-audio-tag").prop("currentTime");
  $(".js-progress").prop( "value", currentTime );
}


function fetchArtistInfo () {
  var artistUrl = $(".js-show-artist").data( "artist-url" );

  $.ajax({
    type: "GET",
    url: artistUrl,
    success: showArtistModal,
    error: handleError
  });
}

function showArtistModal (response) {
  console.log("Artist details response");
  console.log(response);

  if (response.images.length > 0) {
    var imageUrl = response.images[0].url;
  }
  else {
    var imageUrl = "https://media.giphy.com/media/3o72FcL4VW0cmNfwvC/giphy.gif";
  }

  $(".js-artist-name").text( response.name );
  $(".js-artist-photo").prop( "src", imageUrl );
  $(".js-artist-followers").text( response.followers.total );
  $(".js-artist-popularity").text( response.popularity );

  $(".js-artist-genres").empty();

  response.genres.forEach(function (theGenre) {
    var html = `<li> ${theGenre} </li>`;

    $(".js-artist-genres").append(html);
  });

  $(".js-modal").modal("show");
}
