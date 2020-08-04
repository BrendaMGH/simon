//Variables
var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=0;

//creates sequence
function nextSequence(){
    level++;
    $("h1").html("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//creates users sequence
$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//play the corresponding sound
function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");

    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

//indetifies first press
$(document).keydown(function(){
    if(!start){
        nextSequence();
        $("h1").html("Level " + level); 
        start++;
    }
    
});

//compares the sequences
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(currentLevel===gamePattern.length-1){
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }else{
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
        console.log(gamePattern);
        console.log(userClickedPattern);
        console.log(currentLevel);
    }
}

//restrats the game
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    start=0;
}