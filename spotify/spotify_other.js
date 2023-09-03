var currentPictureNumber = 1;

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

function playPlaylist()
{
    fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'context_uri': 'spotify:playlist:11fNnnRZG7aaR5TAnf28bM',
        'offset': {
            'position': 1
        },
        'position_ms': 0
    })
    });
}