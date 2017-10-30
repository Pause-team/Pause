// run the loop every 10 seconds
getTitle();
var loopTime = 10000;
setInterval(timeStamp,loopTime);

function getTitle() {
    // get the title of the video being played
    var videoTitle = document.title;
    console.log(videoTitle);
}

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