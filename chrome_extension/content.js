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
        var videoTitle = document.querySelector('.title').innerHTML;
        console.log(videoTitle);
    } else if (window.location.href.indexOf("netflix") > -1) {
        var videoTitle = document.getElementsByClassName('video-title');
        console.log('Title: ' + videoTitle[0].textContent)
    }

    // call the function on "pause" event
    video.onpause = function() {
        var videoTitle = document.getElementsByClassName('video-title');
        if (window.location.href.indexOf("youtube") > -1) {
            var videoTitle = document.querySelector('.title').innerHTML;
            console.log(videoTitle);
        } else if (window.location.href.indexOf("netflix") > -1) {
            var videoTitle = document.getElementsByClassName('video-title');
            console.log('Title: ' + videoTitle[0].textContent)
        }

        // setup variables to send to the php function
        // access the localstorage to get the user id,
        // pass all the variables to the ajax url
        chrome.storage.local.get('user_id', function(result) {
            var user_id = '"'+JSON.parse(result.user_id).uid+'"';
            var userName = JSON.parse(result.user_id).displayName;
            var emailId = JSON.parse(result.user_id).email;
            alert(userName);
            alert(emailId);
            // the url of the video being watched
            video_url = window.location.href;
            // current placeholder - will change after getting this info from the login page
            $.ajax({
                type: "POST",
                url: "https://localhost/Pause/pause-team.github.io/database/insertData.php",
                data: {
                    'user_id': user_id,
                    'user_name': userName,
                    'email_id': emailId,
                    'video_title': videoTitle,
                    'url': video_url,
                    'total_duration': video.duration,
                    'video_progress': video.currentTime
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
    chrome.runtime.sendMessage({
        greeting: "hello"
    }, function(response) {
        console.log(response.farewell);
    });
});