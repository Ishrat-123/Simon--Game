var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }

});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}


function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //return  randomChosenColour;

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour)
    //console.log(gamePattern);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any key to Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}