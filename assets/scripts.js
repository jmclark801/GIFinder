// api key for GIPHY= DuOj8uufa0QSpV0TpSTo5eAip9bPStBX

var queryURL = ""
var searchTerms = ["Hedgehog", "Puppies"]

$("#form-button").on('click', function(){
  searchTerms.push($("#form-input").val().trim())
  renderSearchButtons() 
  $('#form-input').val("");
})

function renderSearchButtons(){
  $("#buttons-container").empty()
  for (var i=0; i < searchTerms.length; i++){
    var newButton = $("<button>")
    newButton.addClass("button-search").val(searchTerms[i]).text(searchTerms[i]);
    $("#buttons-container").append(newButton);
    searchClickHandler();
  }
}

function searchClickHandler(){
  $('.button-search').on('click', function(){
    console.log($(this))
    var searchTerm = $(this).val()
    console.log(searchTerm)
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DuOj8uufa0QSpV0TpSTo5eAip9bPStBX&limit=10&q=" + searchTerm;
  
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response){
      var results = response.data
      var state = "play"
      $("#images-container").empty()
      results.forEach(function(results){
        var display = $("<div>")
        var image = $("<img>")
        display.addClass("image-wrapper")
        display.attr("id", results.id)
        image.addClass("giphy-image")
        image.attr("src", results.images.original.url)
        image.attr("data-play-src", results.images.original.url)
        image.attr("data-pause-src", results.images.original_still.url)
        image.attr("data-state", state)
        display.append(image)
        $("#images-container").append(display)
      })
      $(".giphy-image").on('click', imageClickHandler)
    });  
  })
}

function imageClickHandler(){ 
  var state = $(this).attr('data-state')
  if (state === 'play') {
    $(this).attr('data-state', 'pause')
    $(this).attr('src', $(this).attr('data-pause-src'))
  } else if (state === 'pause'){
    $(this).attr('data-state', 'play')
    $(this).attr('src', $(this).attr('data-play-src'))
  }
  
}
 
renderSearchButtons()



// $(document).on('click', displayResults)

// var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// // displayMovieInfo function re-renders the HTML to display the appropriate content
// function displayMovieInfo() {

//   var movie = $(this).attr("data-name");
//   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

//   // Creating an AJAX call for the specific movie button being clicked
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     var movieDiv = $("<div class='movie'>");
//     var rating = response.Rated;
//     var pOne = $("<p>").text("Rating: " + rating);
//     movieDiv.append(pOne);
//     var released = response.Released;
//     var pTwo = $("<p>").text("Released: " + released);
//     movieDiv.append(pTwo);
//     var plot = response.Plot;
//     var pThree = $("<p>").text("Plot: " + plot);
//     movieDiv.append(pThree);
//     var imgURL = response.Poster;
//     var image = $("<img>").attr("src", imgURL);
//     movieDiv.append(image);
//     $("#movies-view").prepend(movieDiv);
//   });

// }

// // Function for displaying movie data
// function renderButtons() {

//   $("#buttons-view").empty();
//   for (var i = 0; i < movies.length; i++) {
//     var a = $("<button>");
//     a.addClass("movie-btn");
//     a.attr("data-name", movies[i]);
//     a.text(movies[i]);
//     $("#buttons-view").append(a);
//   }
// }

// $("#add-movie").on("click", function(event) {
//   event.preventDefault();
//   var movie = $("#movie-input").val().trim();
//   movies.push(movie);
//   renderButtons();
// });

// $(document).on("click", ".movie-btn", displayMovieInfo);
// renderButtons();
