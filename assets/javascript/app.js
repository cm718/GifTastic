$(document).ready(function() {

  var api = "https://api.giphy.com/v1/gifs/search?q=";
  var key = "&api_key=twXD95cHwEaRmsSFNbYwKcB0UcQfahBF&limit=10";
  var list = ["cat", "dog", "monkey", "piggy", "otter",
    "goose", "snake", "hippo", "gerbil", "shark", "goldfish", "dolphin"
  ];
  var newButton;

  // Function to put all the buttons from the array into the html
  function renderButtons() {
    // Deleting the buttons prior to adding new buttons
    $("#put-buttons-here").empty();

    // Looping through the array of animals
    for (var i = 0; i < list.length; i++) {

    // Dynamically generate buttons for each animal in the array
      // Create the button element
      var b = $("<button>");
      // Adding a class of animal button
      b.addClass("animal-button");
      // Adding a data-attribute
      b.attr("data-name", list[i]);
      // Providing the initial button text
      b.text(list[i]);
      // Adding the button to the put-buttons-here div
      $("#put-buttons-here").append(b);
    }
  }

  // Function to add user input to the list array
  function addButton() {
    // Make a varialbe to grab the text of the input
    var input = $("#animal-input").val();
    // Add the new user input to the list array
    list.push(input);
    // Run the renderButtons function to add the button to the html
    renderButtons();
    // Empty out the user input field
    $("#animal-input").val("");
  }

  // Function to render the gifs into the html and apply their attributes
  function displayGifs() {
    // First empty the div if it is not already
    $("#put-gifs-here").empty();

    // Grab and store the input value from the user
    var animal = $(this).text();

    // Construct the queryURL with the input value
    var queryURL = api + animal + key;

    // Make the AJAX call with the newly made queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Store the results from the AJAX call into a variable
      var results = response.data;

      // Loop through the results
      for (var i = 0; i < results.length; i++) {

        // Create and store a div tag into a variable called animalDiv
        var animalDiv = $("<div>");

        // Create and store a paragraph tag into a variable called p
        var p = $("<p>").text(`Rating: ${results[i].rating}`);

        // Create and store an image tag into a variable called animalImage
        var animalImage = $("<img>");

        // Set the src attribute of the image to the property of the result
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-live", results[i].images.fixed_height.url);

        // Append the paragraph and image tags to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prepend the animalDiv to the HTML on the page
        $("#put-gifs-here").prepend(animalDiv);
      }
    });
  };

  // Function to flip between still and live on click of images
  function flipState() {
    var source = $(this).attr("src");
    var still = $(this).attr("data-still");
    var live = $(this).attr("data-live");
    if (source === still){
      $(this).attr("src", live);
    }
    else {
      $(this).attr("src", still);
    }
  }

  $("#button-maker").on("click", addButton);

  $(document).on("click", ".animal-button", displayGifs);

  $(document).on("click", "img", flipState);

  renderButtons();

});
