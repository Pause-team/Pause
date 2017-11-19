var config = {
    apiKey: "AIzaSyC3FpISPgUilSgSmpm-pjOUPlRp8nYwm5Q",
    authDomain: "pause-fb19e.firebaseapp.com",
    databaseURL: "https://pause-fb19e.firebaseio.com",
    projectId: "pause-fb19e",
    storageBucket: "pause-fb19e.appspot.com",
    messagingSenderId: "714359295912"
};

$(document).ready(function() {
    $('#chromeSignInButton').click(function() {
        var newURL = "http://localhost/Pause/pause-team.github.io/#";
        chrome.tabs.create({
            url: newURL
        });
    });
});