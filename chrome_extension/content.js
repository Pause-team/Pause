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
        // access the localstorage to get the user id,
        // pass all the variables to the ajax url
        chrome.storage.local.get('user_id', function(result) {
            var user_id = result.user_id;
            alert(user_id);

            // the url of the video being watched
            video_url = window.location.href;
            // current placeholder - will change after getting this info from the login page
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
        });
    };
}

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        user_id = event.data.text;
        alert(user_id);
        // save the user id in the local storage of the extension
        chrome.storage.local.set({
            "user_id": user_id
        });
    }
});