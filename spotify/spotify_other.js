var currentPictureNumber = 1;
var menuShow = false;

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

function play()
{
    fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'context_uri': 'spotify:playlist:2v7467edUJbPMWwiw3Xkrf',
        'offset': {
            'position': 0
        },
        'position_ms': 0
    })
    });
}

function toast(msg, type)
{
    var snackbar = document.getElementById("snackbar");
    var snackbar_msg = document.getElementById("snackbar-message");
    if (snackbar.className == 'show')
    {
        setTimeout(function() {
            toast(msg, type);
        }, 3000);
    }
    else
    {
        snackbar.className = "show";
        snackbar_msg.innerHTML = msg;
        if (type == 'error') snackbar.style.borderColor = "red";
        else if (type == 'success') snackbar.style.borderColor = "green";
        else snackbar.style.borderColor = "transparent";
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 5000);
    }
}

function showMenu()
{
    if (menuShow == false)
    {
        document.getElementById('menu-arrow-down').style.display = "none";
        document.getElementById('menu-arrow-up').style.display = "block";
        menuShow = true;
    }
    else
    {
        document.getElementById('menu-arrow-up').style.display = "none";
        document.getElementById('menu-arrow-down').style.display = "block";
        menuShow = false;
    }
}