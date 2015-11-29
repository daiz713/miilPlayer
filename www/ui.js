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

    // 初期collectionを登録
    mp.photoPanel.setCollection([
        {photo: 'photos/steak.jpg', page: ''},
        {photo: 'photos/pancake.jpg', page: ''},
        {photo: 'photos/miillunch.jpg', page: ''},
        {photo: 'photos/sushi.jpg', page: ''}
    ]);

    // 初期画像を表示
    mp.showNextItem();
    mp.startSlideShow();

    console.info('main ok');
});
