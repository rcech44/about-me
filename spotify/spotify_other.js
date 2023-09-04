var currentPictureNumber = 1;
var menuShow = false;
var initialized = false;
var playlists = [];
var selectedPlaylistTracks = [];

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
        // Change arrow icon
        document.getElementById('menu-arrow-down').style.display = "none";
        document.getElementById('menu-arrow-up').style.display = "block";

        // Move icon
        document.getElementById("scroll-button-area").style.removeProperty("bottom");
        document.getElementById("scroll-button-area").style.setProperty("bottom", "70vh");

        // Move other UI
        document.getElementById("spotify-current-info").style.removeProperty("bottom");
        document.getElementById("spotify-current-info").style.setProperty("bottom", "74vh");
        document.getElementById("playback-settings-area").style.removeProperty("bottom");
        document.getElementById("playback-settings-area").style.setProperty("bottom", "calc(74vh + 160px)");

        // Show menu vignette
        document.getElementById("menu-vignette").style.setProperty("opacity", "50%");

        // Show menu
        document.getElementById("menu").style.removeProperty("bottom");
        document.getElementById("menu").style.setProperty("bottom", "0vh");

        // Set switch
        menuShow = true;
    }
    else
    {
        // Change arrow icon
        document.getElementById('menu-arrow-up').style.display = "none";
        document.getElementById('menu-arrow-down').style.display = "block";

        // Move icon
        document.getElementById("scroll-button-area").style.removeProperty("bottom");
        document.getElementById("scroll-button-area").style.setProperty("bottom", "1vh");

        // Move other UI
        document.getElementById("spotify-current-info").style.removeProperty("bottom");
        document.getElementById("spotify-current-info").style.setProperty("bottom", "4vh");
        document.getElementById("playback-settings-area").style.removeProperty("bottom");
        document.getElementById("playback-settings-area").style.setProperty("bottom", "calc(4vh + 160px)");

        // Show menu vignette
        document.getElementById("menu-vignette").style.setProperty("opacity", "0%");

        // Show menu
        document.getElementById("menu").style.removeProperty("bottom");
        document.getElementById("menu").style.setProperty("bottom", "-70vh");

        // Set switch
        menuShow = false;
    }
}

async function downloadMe()
{
    const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
    }
    });
    const info = await response.json();
    localStorage.setItem("user_id", info['id']);
    await downloadPlaylists();
    console.log(info);
    initialized = true;
}

async function downloadPlaylists()
{
    var end = false;
    var url = "https://api.spotify.com/v1/me/playlists?limit=50";
    while (end == false)
    {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        });
        const info = await response.json();
        Array.prototype.push.apply(playlists, info['items']);
        if (info['next'] == null) end = true;
        else url = info['next'];
    }
    console.log(playlists);
    fillPlaylists();
}

function fillPlaylists()
{
    var area = document.getElementById("playlist-list");
    playlists.sort(sortPlaylists);

    playlists.forEach( (playlist) => {
        var new_element = document.createElement("div");
        new_element.style.flex = "1";
        new_element.innerHTML = playlist['name'];
        new_element.onclick = async function() {await getPlaylistTracks(playlist['id'])};
        area.appendChild(new_element);
    });
}

function sortPlaylists(a, b) {
    if ( a['name'] < b['name'] ){
      return -1;
    }
    if ( a['name'] > b['name'] ){
      return 1;
    }
    return 0;
}

async function getPlaylistTracks(id)
{
    console.log(id);
    var end = false;
    var url = "https://api.spotify.com/v1/playlists/" + id + "/tracks?limit=50";
    selectedPlaylistTracks = [];
    while (end == false)
    {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        });
        const info = await response.json();
        Array.prototype.push.apply(selectedPlaylistTracks, info['items']);
        if (info['next'] == null) end = true;
        else url = info['next'];
    }
    console.log(selectedPlaylistTracks);
    fillTracks();
}

function fillTracks()
{
    var area = document.getElementById("tracks-list");
    area.innerHTML = "";

    selectedPlaylistTracks.forEach( (track) => {
        var new_element = document.createElement("div");
        new_element.style.flex = "1";
        new_element.innerHTML = track['track']['name'];
        new_element.onclick = async function() {await playTrack(track['track']['id'])};
        area.appendChild(new_element);
    });
}

async function playTrack(id)
{
    await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "uris": ["spotify:track:" + id]
    })
    });
}