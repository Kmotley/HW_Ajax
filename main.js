$(document).ready(function() {

    // An array of animals, new animals will be pushed into this array;
    var animals = ["Dog", "Cat", "Kangaroo", "rabbit", "monkey", "turtle", "chicken", "goat", "kitten", "bird", "frog"];



    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayAnimals() {
        $("#animalButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < animals.length; i++) {

            var gifButton = $("<button>"); //Creating the button for my animal
            gifButton.addClass("action"); //adding classes to that button
            gifButton.addClass("animalButtons"); //adding classes to that button
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#animalButtonsView").append(gifButton); //addding new button to list of current buttons
        }
    }

    // Function to add a new animal button
    function addNewButton() {
        $("#addAnimal").on("click", function() {
            var action = $("#animal-input").val().trim();
            if (action == "") {
                return false; // added so user cannot add a blank button
            }
            animals.push(action);

            displayAnimals();
            console.log(displayAnimals());
            $("#animal-input").val(""); //added to clear field after input...
            return false;


        });
    }

    // Function that displays all of the gifs
    function displayGifs() {
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response); // console test to make sure something returns
                $("#gifs-go-here").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
                var results = response.data; //shows results of gifs
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); //div for the gifs to go inside
                    gifDiv.addClass("gifDiv");

                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                    gifImage.attr("data-state", "still"); // set the image state
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // pulling still image of gif
                    // adding div of gifs to #gifs-go-here div
                    $("#gifs-go-here").prepend(gifDiv);
                }
            });
    }

    // Calling Functions & Methods
    displayAnimals(); // displays list of animals already created
    addNewButton();

    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

});