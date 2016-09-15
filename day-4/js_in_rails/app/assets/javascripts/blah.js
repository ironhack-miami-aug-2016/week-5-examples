//  In Rails you shouldn't use $(document).ready()
//               |
// $(document).ready(function () {
// });


//  Use this instead of .ready() in Rails
//                     |
$(document).on("turbolinks:load", function () {
  alert("We are using JavaScript now!");
});
