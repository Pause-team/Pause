// run the loop every 10 seconds
var loopTime = 10000;
setInterval(timeStamp,loopTime);

// function to display the current time stamp on the console
function timeStamp() {
    video = document.getElementsByClassName('video-stream')[0];
    // currentTime gives the current time stamp of the video
    console.log(video.currentTime);
    // call the function on "pause" event
    video.onpause = function() {
        console.log(video.currentTime);
    };
}