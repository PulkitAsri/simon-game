var randomPattern = [];
var userChosenPattern = [];
var colorPalette = ["green", "red", "yellow", "blue"];
var level = 0;

$(document).keypress(function (event) {
    if (level === 0) nextSequence();

});

//clickListners for each class
colorPalette.forEach(e => {
    $("#" + e).on("click", function () {
        //animate
        animatePressed(e);
        //play sound
        playSound(e);

        userChosenPattern.push(e);
        checkAnswer(userChosenPattern.length - 1);

        console.log(userChosenPattern);
        console.log(randomPattern);

    });
});

function nextSequence() {

    userChosenPattern = [];

    level++;
    $("#level-title").text("level " + level);

    var randomColor = colorPalette[Math.floor(Math.random() * 4)];
    randomPattern.push(randomColor);

    playSound(randomColor);
    animatePressed(randomColor);

}

function checkAnswer(index) {

    if (userChosenPattern[index] === randomPattern[index]) {
        if (userChosenPattern.length === randomPattern.length) {
            animateNextLevel();
            console.log("right");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }


    } else if (level === 0) {} else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        level = 0;
        animateGameOver();
        $("#level-title").text("Game Over.Press any Key to Start again!");

    }

}

function animatePressed(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}

function animateGameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function animateNextLevel() {
    $("body").addClass("next-level");
    setTimeout(function () {
        $("body").removeClass("next-level");
    }, 200);

}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}