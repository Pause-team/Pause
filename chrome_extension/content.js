// run the loop every 10 seconds
// window.onload="getTitle()";
var loopTime = 10000;
setInterval(timeStamp, loopTime);

// function to display the current time stamp on the console
function timeStamp() {
    video = document.querySelectorAll('video')[0];
    // currentTime gives the current time stamp of the video
    console.log('Current Time Stamp- ' + video.currentTime);
    if (window.location.href.indexOf("youtube") > -1) {
        var videoTitle = document.getElementById('video-title');
        console.log('Title: ' + videoTitle.innerText);
    } else if (window.location.href.indexOf("netflix") > -1) {
        var videoTitle = document.getElementsByClassName('video-title');
        console.log('Title: ' + videoTitle[0].textContent)
    }

    // call the function on "pause" event
    video.onpause = function() {
        var videoTitle = document.getElementsByClassName('video-title');
        console.log('Current Time Stamp: ' + video.currentTime);

        // setup variables to send to the php function
        // the url of the video being watched
        video_url = window.location.href;
        // current placeholder - will change after getting this info form the login page
        user_id = 1;
        $.ajax({
            type: "POST",
            url: "https://localhost/Pause/pause-team.github.io/database/insertData.php",
            data: {
                'user_id': user_id,
                'url': video_url,
                'currentTime': video.currentTime
            },
            success: function(data) {
                console.log(data);
            }
        });
    };
}