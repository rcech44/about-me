const clientId = "cf932bfcf55749eeb64c3cccc6aafb10"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const colorThief = new ColorThief();
var token;
var player;

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128)
    const challenge = await generateCodeChallenge(verifier)
  
    localStorage.setItem("verifier", verifier)
  
    const params = new URLSearchParams()
    params.append("client_id", clientId)
    params.append("response_type", "code")
    params.append("redirect_uri", "http://localhost:8080/spotify.html")
    params.append("scope", "user-read-currently-playing user-modify-playback-state user-read-playback-state user-read-email user-read-private user-read-email streaming app-remote-control")
    params.append("code_challenge_method", "S256")
    params.append("code_challenge", challenge)
  
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}
  
async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier")
  
    const params = new URLSearchParams()
    params.append("client_id", clientId)
    params.append("grant_type", "authorization_code")
    params.append("code", code)
    params.append("redirect_uri", "http://localhost:8080/spotify.html")
    params.append("code_verifier", verifier)
  
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    })
  
    const { access_token } = await result.json();
    localStorage.setItem("token", access_token);
    console.log(access_token);
    return access_token;
}
  
function generateCodeVerifier(length) {
    let text = ""
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
  
async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier)
    const digest = await window.crypto.subtle.digest("SHA-256", data)
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
}
  
if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    token = await getAccessToken(clientId, code);
    initSpotify();
}

function initSpotify()
{
    // Defining Spotify behavior
    window.onSpotifyWebPlaybackSDKReady = () => 
    {
        // Init class
        player = new Spotify.Player(
        {
            name: 'Oreo Spotify Website',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        // Ready + set device playback
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            const result = fetch("https://api.spotify.com/v1/me/player", {
                method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({
                    'device_ids': [
                        device_id
                    ]
                })
            }).then(function() {
                console.log("Transfered playback to website.");
            });
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Player state changed
        player.addListener('player_state_changed', ({position, duration, track_window: { current_track } }) => {
            document.getElementById("track-info-name").innerHTML = current_track['name'];
            document.getElementById("track-info-artist").innerHTML = current_track['artists'][0]['name'];
            document.getElementById("track-info-album").innerHTML = "from " + current_track['album']['name'];
            document.getElementById("album-cover").src = current_track['album']['images'][0]['url'];
            setTimeout(function() {
                const img = document.getElementById("album-cover");
                var color = [];

                // Make sure image is finished loading
                if (img.complete) {
                    color = colorThief.getColor(img);
                    document.getElementById("track-info-name").style.setProperty("filter", "drop-shadow(0 0 5px rgba(" + color[0] + "," + color[1] + "," + color[2] + ", 0.7))");
                    document.getElementById("album-cover").style.boxShadow = "0 0 20px rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
                    document.getElementById("album-cover").style.borderColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
                } 
                else {
                    image.addEventListener('load', function() {
                        color = colorThief.getColor(img);
                        document.getElementById("track-info-name").style.setProperty("filter", "drop-shadow(0 0 5px rgba(" + color[0] + "," + color[1] + "," + color[2] + ", 0.7))");
                        document.getElementById("album-cover").style.boxShadow = "0 0 20px rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
                        document.getElementById("album-cover").style.borderColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
                    });
                }
            }, 500);
            console.log(current_track);
        });

        // Init error
        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        // Auth error
        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        // Account error
        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        // Set buttons
        document.getElementById('play-button').onclick = function() 
        {
            player.togglePlay();
        };
        document.getElementById('next-track-button').onclick = function() 
        {
            player.nextTrack();
        };
        document.getElementById('previous-track-button').onclick = function() 
        {
            player.previousTrack();
        };

        player.connect();
    }

    // After defining Spotify behavior, download their script
    var script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);
}

// async function fetchProfile(token) {
//     console.log(token);
//     const result = await fetch("https://api.spotify.com/v1/me/player/devices", {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     console.log(await result.json());
// }