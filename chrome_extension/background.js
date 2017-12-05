// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // Fires this for every URL
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        urlContains: ''
                    },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
// Execute the content.js script
chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        file: ["jquery.min.js", "content.js"]
    });
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.local.get('user_id', function(result) {
            var user_id = result.user_id;
            var newURL = "https://pause.trixster.xyz/profile.php?username=" + JSON.stringify(JSON.parse(user_id).uid);
            chrome.tabs.update({
                url: newURL
            });;
        });
    });
