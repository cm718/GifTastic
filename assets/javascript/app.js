$(document).ready(function() {

var api = "https://api.giphy.com/v1/gifs/search?q=";
var key = "&api_key=twXD95cHwEaRmsSFNbYwKcB0UcQfahBF&limit=10";
var list = ["cat", "dog", "monkey", "piggy", "otter"];

function putButtons(){
  for (var i = 0; i < list.length; i++){
    // Create a button tag and assign it to a variable
    var newButton = $("<button>");


  }
}

$("#gif-maker").on("click", function(){
  // Grab and store the input value from the user
  var animal = $("#animal-input").val().trim();
  console.log(animal);



  // Construct the queryURL with the input value
  var queryURL = api + animal + key;

  // Make the AJAX call with the newly made queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      console.log(queryURL);
      console.log(response);

      // Store the results from the AJAX call into a variable
      var results = response.data;

      // Loop through the results
      for (var i = 0; i < results.length; i++){

        // Create and store a div tag into a variable called animalDiv
        var animalDiv = $("<div>");

        // Create and store a paragraph tag into a variable called p
        var p = $("<p>").text(`Rating: ${results[i].rating}`);

        // Create and store an image tag into a variable called animalImage
        var animalImage = $("<img>");

        // Set the src attribute of the image to the property of the result
        animalImage.attr("src", results[i].images.fixed_height.url);

        // Append the paragraph and image tags to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prepend the animalDiv to the HTML on the page
        $("#put-gifs-here").prepend(animalDiv);

      }
    });
    // Empty out the user input field
    $("#animal-input").val("");
    console.log($("#animal-input"));
});

putButtons();


});
