var currentPictureNumber = 1;
var menuShow = false;
var initialized = false;
var playlists = [];
var selectedPlaylistTracks = [];

var imagesInterval = setInterval(function() {
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

function playVideo()
{
    clearInterval(imagesInterval);
    
}

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
        var div_1 = document.createElement("div");
        div_1.style.display = "flex";
        div_1.style.margin = "5px";
        div_1.style.marginBottom = "8px";
        div_1.style.maxHeight = "50px";
        div_1.style.flex = "1";
        div_1.style.flexDirection = "row";
        div_1.style.alignItems = "flex-start";
    
        var img = document.createElement("img");
        img.src = playlist['images'][0]['url'];
        img.style.marginRight = "10px";
        img.style.backgroundSize = "cover";
        img.style.backgroundPosition = "center";
        img.style.objectFit = "fill";
        img.style.width = "45px";
        img.width = "45px";
        img.style.height = "45px";
        img.height = "45px";
        img.style.borderRadius = "5px";
    
        var div_2 = document.createElement('div');
        div_2.style.flex = "1";
        div_2.style.display = "flex";
        div_2.style.flexDirection = "column";
    
        var a_1 = document.createElement('a');
        a_1.className = "spotify-font";
        a_1.style.flex = "1";
        a_1.style.fontSize = "18px";
        a_1.style.color = "white";
        a_1.style.marginTop = "2px";
        a_1.style.wordBreak = "none";
        a_1.style.whiteSpace = "nowrap";
        a_1.innerHTML = playlist['name'];
    
        var a_2 = document.createElement('a');
        a_2.className = "font-1";
        a_2.style.flex = "1";
        a_2.style.fontSize = "13px";
        a_2.style.color = "#bbbbbb";
        a_2.style.marginTop = "3px";
        a_2.style.wordBreak = "none";
        a_2.style.whiteSpace = "nowrap";
        a_2.innerHTML = playlist['description'].substring(0, 75) + "...";
    
        div_2.appendChild(a_1);
        div_2.appendChild(a_2);
        div_1.appendChild(img);
        div_1.appendChild(div_2);

        div_1.onclick = async function() {await getPlaylistTracks(playlist['id'])};
        area.appendChild(div_1);
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

        var div_1 = document.createElement("div");
        div_1.style.display = "flex";
        div_1.style.margin = "5px";
        div_1.style.marginBottom = "8px";
        div_1.style.maxHeight = "50px";
        div_1.style.flex = "1";
        div_1.style.flexDirection = "row";
        div_1.style.alignItems = "flex-start";
    
        var img = document.createElement("img");
        img.src = track['track']['album']['images'][0]['url'];
        img.style.marginRight = "10px";
        img.style.backgroundSize = "cover";
        img.style.backgroundPosition = "center";
        img.style.objectFit = "fill";
        img.style.width = "45px";
        img.width = "45px";
        img.style.height = "45px";
        img.height = "45px";
        img.style.borderRadius = "5px";
    
        var div_2 = document.createElement('div');
        div_2.style.flex = "1";
        div_2.style.display = "flex";
        div_2.style.flexDirection = "column";
    
        var a_1 = document.createElement('a');
        a_1.className = "spotify-font";
        a_1.style.flex = "1";
        a_1.style.fontSize = "18px";
        a_1.style.color = "white";
        a_1.style.marginTop = "2px";
        a_1.innerHTML = track['track']['name'];
    
        var a_2 = document.createElement('a');
        a_2.className = "font-1";
        a_2.style.flex = "1";
        a_2.style.fontSize = "13px";
        a_2.style.color = "#bbbbbb";
        a_2.style.marginTop = "3px";
        a_2.style.wordBreak = "none";
        a_2.style.whiteSpace = "nowrap";
        a_2.innerHTML = track['track']['artists'][0]['name'];
    
        div_2.appendChild(a_1);
        div_2.appendChild(a_2);
        div_1.appendChild(img);
        div_1.appendChild(div_2);

        div_1.onclick = async function() {await playTrack(track['track']['id'])};
        area.appendChild(div_1);
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