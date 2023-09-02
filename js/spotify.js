window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-window');
    const options = {
        uri: 'spotify:playlist:5QXj8hf0nVRdeKZY6nhTwd',
        width: '1000px',
        height: '300px',
        id: "test"
      };
    const callback = (EmbedController) => {    console.log('test');};
    IFrameAPI.createController(element, options, callback);
  };


// var hookInterval = setInterval(function(){
//     try {
//         var iframe = document.querySelector("#spotify-window-2").children[0];
//         // var iframeDocument = iframe.contentWindow.document.body.innerHTML;
//         console.log(iframe.getElementsByClassName("TracklistRow_isCurrentTrack__twcgg"));
//     }
//     catch{

//     }
// }, 500);