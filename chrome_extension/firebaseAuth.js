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
        var newURL = "https://pause-team.github.io?signin=true";
    chrome.tabs.create({ url: newURL });
    });

});