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

    // http://localhost:3000/miilusers/daiz.json
    mp.showItems('http://localhost:3000/miilusers/daiz.json');
    console.info('main ok');
});
