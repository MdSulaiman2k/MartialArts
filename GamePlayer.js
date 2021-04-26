class GamePlayer {
  c = document.getElementById("mycanvas");
  ctx = this.c.getContext("2d");
  constructor(player, xAxis) {
    // the player is store 1st player or 2nd palyer
    this.player = player;
    // this steps is store the  x axis of the player
    this.steps = xAxis;
    // this step is store the x axis of previous position
    this.step = this.steps;
    this.frames = {
      kick: [1, 2, 3, 4, 5, 6, 7],
      punch: [1, 2, 3, 4, 5, 6, 7],
      block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      backward: [1, 2, 3, 4, 5, 6],
      forward: [1, 2, 3, 4, 5, 6],
      idle: [1, 2, 3, 4, 5, 6, 7, 8],
      oppidle: [1, 2, 3, 4, 5, 6, 7, 8],
      oppkick: [1, 2, 3, 4, 5, 6, 7],
      opppunch: [1, 2, 3, 4, 5, 6, 7],
      oppblock: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      oppbackward: [1, 2, 3, 4, 5, 6],
      oppforward: [1, 2, 3, 4, 5, 6],
    };
    this.arr = Object.keys(this.frames);
    // the score is stored the points of the player
    this.score = 10;
  }
  // this function is to load a single image
  loadimage = (imgsrc, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = imgsrc;
  };
  // this function is used to return the path
  imgpath = (framenumber, foldername) => {
    return "images/" + foldername + "/" + framenumber + ".png";
  };

  // this function is used to load all the images
  loadimages = (callback) => {
    let imagesToLoad = 0;
    let images = {
      idle: [],
      kick: [],
      punch: [],
      block: [],
      backward: [],
      forward: [],
      oppidle: [],
      oppkick: [],
      opppunch: [],
      oppblock: [],
      oppbackward: [],
      oppforward: [],
    };
    this.arr.forEach((animation) => {
      let animationFrames = this.frames[animation];
      imagesToLoad += animationFrames.length;
      animationFrames.forEach((frameNumber) => {
        let path = this.imgpath(frameNumber, animation);
        this.loadimage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad--;
          if (imagesToLoad == 0) {
            callback(images);
          }
        });
      });
    });
  };

  // The function is used to animate the player1 and player2
  animate = (
    opponentplayer,
    images,
    animation,
    opponentanimation,
    callback
  ) => {
    images[animation].forEach((image, index) => {
      setTimeout(() => {
        this.ctx.clearRect(0, -20, 1300, 500);
        if (index <= images[animation].length)
          this.ctx.drawImage(image, this.steps, -20, 500, 500);
        if (opponentplayer != null && index < images[opponentanimation].length)
          this.ctx.drawImage(
            images[opponentanimation][index],
            opponentplayer.steps,
            -20,
            500,
            500
          );
      }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
  };

  // Check whether the game was over or not and reduce the opponent score
  checkGameOver = (opponentplayer) => {
    let difference =
      this.player == 1
        ? opponentplayer.steps - (this.steps + 100)
        : this.steps - (opponentplayer.steps + 100);
    if (difference <= 150) {
      let gameid = this.player == 1 ? "#opp" : "#player";
      gameid += opponentplayer.score;
      $(gameid).css("display", "none");
      opponentplayer.score--;
      if (opponentplayer.score == 0) {
        $("#winBy").html("Player " + this.player + "   was won the match");
        $("#gameover").modal("show");
      }
    }
  };
}
