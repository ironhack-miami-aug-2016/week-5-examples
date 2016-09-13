
$(document).ready(function () {

  // Page has finished loading, we are ready to select things.
  $('.hello-button').on('click', function () {
    alert('hello world');
  });

  $(".empanadas").on("click", function () {
    alert("CHILE EMPANADAS");

    $("body").append("<h1> EMPANADAS </h1>");
  });


  $(".js-like-button").on("click", function () {

    if ( $(".js-like-button").hasClass("btn-success") ) {
      $(".js-like-button").html("Like")
    }

    else {
      $(".js-like-button").html("Liked +1")
    }

    $(".js-like-button").toggleClass("btn-default");
    $(".js-like-button").toggleClass("btn-success");

  });

});
