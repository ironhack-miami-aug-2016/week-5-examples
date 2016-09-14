console.log("We are GO!!!!");

$(document).ready(function () {

  $(".js-fetch-characters").on("click", fetchCharacters);
  $(".js-add-kylo-ren").on("click", addKylo);

  $(".js-add-new-character").on("click", addNewCharacter);

});


function addNewCharacter (theEvent) {
  theEvent.preventDefault();

  console.log("Add New Character Click");

  var weapon = $(".js-weapon").val();

  console.log(`Weapon: ${name}`);

  var newCharacterFromForm = {
    name: $(".js-name").val(),
    occupation: $(".js-occupation").val(),
    weapon: $(".js-weapon").val()
  };

  $.ajax({
    type: "POST",
    url: "https://ironhack-characters.herokuapp.com/characters",
    data: newCharacterFromForm,
    success: updateList,
    error: handleError
  });
}


function fetchCharacters () {
  console.log("Fetch Characters Click");

  $.ajax({
    type: "GET",
    url: "https://ironhack-characters.herokuapp.com/characters",
    success: showCharacters,
    error: handleError
  });
}


function showCharacters (response) {
  var charactersArray = response;

  $(".js-characters-list").empty();

  charactersArray.forEach(function (theCharacter) {
    var html = `
      <li>
        <h2> ${theCharacter.name} </h2>
        <p> Occupation: ${theCharacter.occupation} </p>
        <p> Weapon: ${theCharacter.weapon} </p>
      </li>
    `;

    $(".js-characters-list").append(html);
  });
}


function handleError (error) {
  console.log("Error!");
  console.log(error.responseText);
}


function addKylo () {
  console.log("Add Kylo Click");

  var newCharacter = {
    name: "Kylo Ren",
    occupation: "First Order Commander",
    weapon: "Homemade Lightsaber"
  };

  $.ajax({
    type: "POST",
    url: "https://ironhack-characters.herokuapp.com/characters",
    data: newCharacter,
    success: updateList,
    error: handleError
  });
}

function updateList (response) {
  console.log("Create Kylo Success!");
  console.log(response);
}
