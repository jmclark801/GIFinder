// api key for GIPHY= DuOj8uufa0QSpV0TpSTo5eAip9bPStBX

var queryURL = ""
var searchTerms = ["Reactions", "Entertainment", "Sports", "Artists"]

$("#form-button").on('click', function(){
  var newTerm = $("#form-input").val().trim()
  if (newTerm !== ""){
    searchTerms.push($("#form-input").val().trim())
  } 
  renderSearchButtons() 
  $('#form-input').val("");
})

function renderSearchButtons(){
  $("#buttons-container").empty()
  for (var i=0; i < searchTerms.length; i++){
    var newButton = $("<button>")
    newButton.addClass("button-search").val(searchTerms[i]).text(searchTerms[i]);
    $("#buttons-container").append(newButton);
  }
  searchClickHandler();
}

function searchClickHandler(){
  $('.button-search').on('click', function(){
    var searchTerm = $(this).val()
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DuOj8uufa0QSpV0TpSTo5eAip9bPStBX&limit=9&q=" + searchTerm;
    $("#images-container").empty()    
    console.log(queryURL)

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response){
      var results = response.data
      var state = "play"
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