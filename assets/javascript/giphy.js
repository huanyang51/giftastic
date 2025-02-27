// giphy API key 6Ws2L6DO87tHU6XxSqZP6gyxoQaWgVn2
var animals = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "turtle",
  "sugar glider",
  "chinchilla",
  "hedgehog",
  "hermit crab",
  "gerbil",
  "pygmy goat",
  "chicken",
  "capybara",
  "teacup pig",
  "serval",
  "salamander",
  "frog"
];
// Event listener for the GIF click events. Toggle its animation.
function eventHandlerGifClicked() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  } else {
    alert("Invalid State");
  }
}
// Parse the results from the query and insert the GIFs
function parseResponse(response) {
  //   console.log(response);
  var results = response.data;
  //   console.log(results);
  // Insert a <div> for each GIF in results
  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div>");
    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);
    var gifStillURL = results[i].images.fixed_height_still.url;
    var gifAnimateURL = results[i].images.fixed_height.url;
    var tempGif = $("<img>")
      .addClass("gif")
      .attr("src", gifStillURL)
      .attr("data-still", gifStillURL)
      .attr("data-animate", gifAnimateURL)
      .attr("data-state", "still");
    gifDiv.prepend(p);
    gifDiv.prepend(tempGif);
    $(".gifs").prepend(gifDiv);
  }
  // console.log($(".gif"));
  // Add event listeners to each GIF
  $(".gif").on("click", eventHandlerGifClicked);
}
function reloadGifs(tempAnimalName) {
  //alert("Refresh GIFs here: " + tempAnimalName);
  //Clear all GIFs
  $(".gifs").empty();
  var animal = tempAnimalName;
  //   console.log(animal);
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=6Ws2L6DO87tHU6XxSqZP6gyxoQaWgVn2&limit=10`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    parseResponse(response);
  });
}
function eventHandlerButtonClicked() {
  var tempAnimalName = $(this).attr("animal");
  //alert(tempAnimalName);
  reloadGifs(tempAnimalName);
}
// render buttons
function renderButtons() {
  // clear previous contents in area for buttons and gifs
  $(".buttons").empty();
  $(".gifs").empty();
  for (var i = 0; i < animals.length; i++) {
    var animalName = animals[i];
    var animalButton = $("<button>")
      .text(animalName)
      .addClass("btn btn-info m-1")
      .attr("animal", animalName);
    animalButton.on("click", eventHandlerButtonClicked);
    $(".buttons").append(animalButton);
  }
}
// When user enter an animal, check if it is in the array,
// if not, add it to the buttons.
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var newAnimal = $("#animal-input")
    .val()
    .trim();
  if (animals.indexOf(newAnimal) === -1) {
    animals.push(newAnimal);
    $("#animal-input").val("");
    renderButtons();
    // console.log(animals);
  }
});

renderButtons();
