let player1 = new GamePlayer(1, -100);
let player2 = new GamePlayer(2, 850);

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
  });
  $("#block").on("click", function () {
    queueAnimation.push("block");
  });
  $("#punch").on("click", function () {
    queueAnimation.push("punch");
  });
  $("#backward").on("click", function () {
    queueAnimation.push("backward");
  });
  $("#forward").on("click", function () {
    queueAnimation.push("forward");
  });
  $("#oppkick").on("click", function () {
    oppqueueAnimation.push("oppkick");
  });
  $("#oppblock").on("click", function () {
    oppqueueAnimation.push("oppblock");
  });
  $("#opppunch").on("click", function () {
    oppqueueAnimation.push("opppunch");
  });
  $("#oppbackward").on("click", function () {
    oppqueueAnimation.push("oppforward");
  });
  $("#oppforward").on("click", function () {
    oppqueueAnimation.push("oppbackward");
  });
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key == "a") {
      queueAnimation.push("punch");
    } else if (key == "d") {
      queueAnimation.push("kick");
    } else if (key == "w") {
      queueAnimation.push("block");
    } else if (key == "x") {
      queueAnimation.push("forward");
    } else if (key == "z") {
      queueAnimation.push("backward");
    } else if (key == "ArrowLeft") {
      oppqueueAnimation.push("oppforward");
    } else if (key == "ArrowRight") {
      oppqueueAnimation.push("oppbackward");
    } else if (key == "k") {
      oppqueueAnimation.push("oppkick");
    } else if (key == "p") {
      oppqueueAnimation.push("opppunch");
    } else if (key == "i") {
      oppqueueAnimation.push("oppblock");
    }
  });
});

$("document").ready(function () {
  $("close").on("click", function () {
    window.location.replace("index.html");
  });
});
