let player1 = new GamePlayer(1, -100);
let player2 = new GamePlayer(2, 850);
let play;

function playAudio(filename) {
  var audio = new Audio("audio/" + filename + ".mp3");
  audio.play();
}

player1.loadimages((images) => {
  let queueAnimation = [];
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
      player1.animate(
        player2,
        images,
        selectedAnimation,
        opponentAnimation,
        aux
      );

    if (selectedAnimation != "idle" || opponentAnimation != "oppidle") {
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
    if (selectedAnimation == "kick" || selectedAnimation == "punch") {
      player1.checkGameOver(player2);
    }
    if (opponentAnimation == "oppkick" || opponentAnimation == "opppunch") {
      player2.checkGameOver(player1);
    }
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
  document.addEventListener("keyup", (event) => {
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
  $("close").on("click", function () {
    window.location.replace("index.html");
  });
});
