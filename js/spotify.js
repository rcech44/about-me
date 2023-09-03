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

// Testing new Spotify API

function test()
{
    $.ajax({
        url: 'https://api.wit.ai/message?v=20140826&q=',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
        }, success: function(data){
            alert(data);
            //process the JSON data etc
        }
})
}