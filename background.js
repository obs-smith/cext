/**
 * Copyright (c) 2024 Jacob Allen Morris
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        let url = details.url;
        if (details.url.startsWith("http://localhost:7090")) {
            return { cancel: false };
        }
        console.log("Web request caught");
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                console.log("Querying tabs");
                if (tabs.length > 0) {
                    var currentTabId = tabs[0].id;
                    console.log("Fetching",
                        fetch(
                            `http://localhost:7090/capture?tabId=${currentTabId}&url=${encodeURIComponent(url)}`
                        ).then((res) => {
                            console.log(res);
                        })
                    );
                }
            }
        );
        return { cancel: false };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
