// api key for GIPHY= DuOj8uufa0QSpV0TpSTo5eAip9bPStBX
// connect to API
// Pull for specific URL
// Pre build a few sample buttons
// Get URL to be dynamic based on buttons
// add ability for new buttons to be added 
// Add pause/start abilities using the src and a data value toggle to control what is used for src
// Optionally implement 'random' button

$('.button-search').on('click', function(){
  console.log($(this))
  var searchTerm = $(this).val()
  console.log(searchTerm)
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DuOj8uufa0QSpV0TpSTo5eAip9bPStBX&limit=10&q=" + searchTerm;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response){
    var results = response.data
    var state = "pause"
    $("#images-container").empty()
    results.forEach(function(results){
      var display = $("<div>")
      var image = $("<img>")
      display.addClass("image-wrapper")
      display.attr("id", results.id)
      image.attr("src", results.images.original.url)
      image.attr("data-play-src", results.images.original.url)
      image.attr("data-pause-src", results.images.original_still.url)
      image.attr("data-state", state)
      display.append(image)
      $("#images-container").append(display)
      console.log(results)
    })
  });
  
})
