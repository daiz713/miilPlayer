// UI関連
var mp;  // miilPlayer

$(function () {
    var $photoPanel = $('#photo');
    var $menuBar    = $('#player-header');
    var $pagerBar   = $('#player-controller');
    mp = new MiilPlayer($(window), $photoPanel, $menuBar, $pagerBar);

    // 上下Barは初期状態では非表示
    mp.menuBar.hide();
    mp.pagerBar.hide();

    var photo_stock = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/miilusers/daiz.json', true);
    xhr.responseType = 'json';
    xhr.onload = function(e) {
        var res = this.response;
        var photos = res.photo.photos;
        for(var i = 0; i < photos.length; i++) {
            var photo = photos[i].photo_url;
            var page  = photos[i].page_url;
            photo_stock.push({photo: photo, page: page});
        }
        // 初期collectionを登録
        mp.photoPanel.setCollection(photo_stock);
        // 初期画像を表示
        mp.showNextItem();
        mp.startSlideShow();
    }
    xhr.send();

    console.info('main ok');
});
