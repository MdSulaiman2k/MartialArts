player = new GamePlayer(1, 200);
let count = 0;
player.loadimages((images) => {
  let aux = () => {
    let selectedAnimation;
    let arr = ["idle", "kick", "punch", "forward", "backward", "block"];
    //the selectedAnimation value  changes  one animate to other animate
    selectedAnimation = arr[count];
    if (count == 5) count = -1;
    count++;

    player.animate(null, images, selectedAnimation, "idle", aux);
  };
  aux();
});
