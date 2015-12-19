// 新たにウィンドウを開く処理はすべてここで行う

var MINI_PLAYER_W = 296;
var MINI_PLAYER_H = 296;
var COLLECTION_PANEL_W = 454;
var COLLECTION_PANEL_H = 600;

// 起動時はコレクションパネルを開く
chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('collections.html', {
        width    : COLLECTION_PANEL_W,
        minWidth : COLLECTION_PANEL_W,
        maxWidth : COLLECTION_PANEL_W,
        height   : COLLECTION_PANEL_H,
        minHeight: COLLECTION_PANEL_H,
        maxHeight: COLLECTION_PANEL_H,
        type: 'shell'
    }, function (appWindow) {
    });
});

// ウィンドウからのイベントを受け取る
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'openMiniPlayer') {
        var collectionName = request.collection_name || 'Sample';
        var api = request.api;
        // location.hashでqueryを渡す
        var src = 'index.html#' + api + collectionName;
        chrome.app.window.create(src, {
            width    : MINI_PLAYER_W,
            minWidth : MINI_PLAYER_W,
            maxWidth : MINI_PLAYER_W,
            height   : MINI_PLAYER_H,
            minHeight: MINI_PLAYER_H,
            maxHeight: MINI_PLAYER_H,
            type: 'shell'
        }, function (appWindow) {
            console.warn("Open mini player: %s", collectionName);
        });

    }
});
