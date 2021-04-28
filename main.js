let player1 = new GamePlayer(1, -100);
let player2 = new GamePlayer(2, 850);
// it will store the which audio to stored
let play = "";

// this function is used to play the Audio
function playAudio(filename) {
  var audio = new Audio("audio/" + filename + ".mp3");
  audio.play();
}

// The function is call the loadimages
player1.loadimages((images) => {
  // the array  is used to  animate the action in queue for 1st player
  let queueAnimation = [];
  // the array  is used to  animate the action in queue for 2nd player
  let oppqueueAnimation = [];
  let aux = () => {
    let selectedAnimation;
    let opponentAnimation;
    if (queueAnimation.length == 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queueAnimation.shift();
    }
    if (oppqueueAnimation.length == 0) {
      opponentAnimation = "oppidle";
    } else {
      opponentAnimation = oppqueueAnimation.shift();
    }
    if (player1.score > 0 && player2.score > 0)
      // the animate function is used to clear and draw the both images
      player1.animate(
        player2,
        images,
        selectedAnimation,
        opponentAnimation,
        aux
      );
    if (selectedAnimation == "block" || opponentAnimation == "oppblock")
      play = "block";
    if (selectedAnimation != "idle" || opponentAnimation != "oppidle") {
      // if selectedAnimation stored 'idle' the audio will not play
      playAudio(play);
    }

    player1.steps +=
      selectedAnimation == "forward" && player1.steps < player2.steps - 50
        ? 100
        : 0;
    player1.steps -=
      selectedAnimation == "backward" && player1.steps > -100 ? 100 : 0;

    player2.steps +=
      opponentAnimation == "oppbackward" && player2.steps <= 800 ? 100 : 0;

    player2.steps -=
      opponentAnimation == "oppforward" && player2.steps > player1.steps + 50
        ? 100
        : 0;
    if (
      (selectedAnimation == "kick" || selectedAnimation == "punch") &&
      opponentAnimation != "oppblock"
    ) {
      player1.checkGameOver(player2);
    }
    if (
      (opponentAnimation == "oppkick" || opponentAnimation == "opppunch") &&
      selectedAnimation != "block"
    ) {
      player2.checkGameOver(player1);
    }
    if (player1.score == 5 || player2.score == 5)
      $("body").css("background-image", "url('images/background2.png')");
    if (player1.score == 2 || player2.score == 2)
      $("body").css("background-image", "url('images/background1.png')");
  };
  aux();
  $("#kick").on("click", function () {
    queueAnimation.push("kick");
    play = "punch";
  });
  $("#block").on("click", function () {
    queueAnimation.push("block");
    play = "block";
  });
  $("#punch").on("click", function () {
    queueAnimation.push("punch");
    play = "punch";
  });
  $("#backward").on("click", function () {
    queueAnimation.push("backward");
    play = "walk";
  });
  $("#forward").on("click", function () {
    queueAnimation.push("forward");
    play = "walk";
  });
  $("#oppkick").on("click", function () {
    oppqueueAnimation.push("oppkick");
    play = "punch";
  });
  $("#oppblock").on("click", function () {
    oppqueueAnimation.push("oppblock");
    play = "block";
  });
  $("#opppunch").on("click", function () {
    oppqueueAnimation.push("opppunch");
    play = "punch";
  });
  $("#oppbackward").on("click", function () {
    oppqueueAnimation.push("oppforward");
    play = "walk";
  });
  $("#oppforward").on("click", function () {
    oppqueueAnimation.push("oppbackward");
    play = "walk";
  });
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
      case "a":
        queueAnimation.push("punch");
        play = "punch";
        break;
      case "d":
        queueAnimation.push("kick");
        play = "punch";
        break;
      case "w":
        queueAnimation.push("block");
        play = "block";
        break;
      case "x":
        queueAnimation.push("forward");
        play = "walk";
        break;
      case "z":
        queueAnimation.push("backward");
        play = "walk";
        break;
      case "ArrowLeft":
        oppqueueAnimation.push("oppforward");
        play = "walk";
        break;
      case "ArrowRight":
        oppqueueAnimation.push("oppbackward");
        play = "walk";
        break;
      case "k":
        oppqueueAnimation.push("oppkick");
        play = "punch";
        break;
      case "p":
        oppqueueAnimation.push("opppunch");
        play = "punch";
        break;
      case "i":
        oppqueueAnimation.push("oppblock");
        play = "block";
        break;
      default:
        break;
    }
  });
});

$("document").ready(function () {
  $("#close").on("click", function () {
    window.location.replace("index.html");
  });
});
