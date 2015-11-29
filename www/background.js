chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('index.html', {
        width    : 296,
        height   : 296,
        minWidth : 296,
        minHeight: 296,
        type: 'shell'
    },function(appWindow) {
    });
});
