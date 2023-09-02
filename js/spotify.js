var player;
var currentPictureNumber = 1;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-window');
    const options = {
        uri: 'spotify:playlist:5QXj8hf0nVRdeKZY6nhTwd',
        width: '500px',
        height: '80px',
        theme: 'dark'
      };
    const callback = (EmbedController) => {    
        player = EmbedController;
        EmbedController.addListener('playback_update', e => {
            // console.log(e);
            });
    };
    IFrameAPI.createController(element, options, callback);
  };

setInterval(function() {
    document.getElementById("image").style.display = "none";
    var randomNumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    while (randomNumber == currentPictureNumber)
    {
        randomNumber = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    }
    currentPictureNumber = randomNumber;
    document.getElementById("image").style.backgroundImage = "url('assets/lofi_pictures/" + currentPictureNumber + ".jpg')";
    document.getElementById("image").style.display = "block";
}, 30000);

// const myElement = document.getElementById("spotify-window-2");

// myElement.addEventListener("mouseover", () => {
//   // Při najetí myši, nastavíme plnou průhlednost
//   myElement.style.opacity = "100%";
// //   console.log("over");
// });

// let timer;

// myElement.addEventListener("mouseout", () => {
//   // Při odjetí myši, spustíme časovač
//   console.log("out");
//   timer = setTimeout(() => {
//     myElement.style.opacity = "50%"; // Nastavíme zpět průhlednost po určité době
//   }, 1000); // Změňte tuto hodnotu na požadovaný časový interval v milisekundách (zde 1000 ms = 1 sekunda)
// });

// myElement.addEventListener("mouseenter", () => {
//   // Při znovu najetí myši, zrušíme časovač
//   clearTimeout(timer);
//   console.log("enter");
// });