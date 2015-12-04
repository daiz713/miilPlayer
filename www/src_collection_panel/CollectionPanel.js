// コレクションリストを管理するクラス
class PhotosStage {
    constructor ($dom) {
        this.$dom = $dom;
        this.bindEvents();
    }

    bindEvents () {
        // コレクションカードのタイトル領域をクリックされたとき
        this.$dom.on('click', '', e => {

        });
    }
}

// コレクションパネルのメニュー操作を管理するクラス
class MenuBar {
    constructor ($dom) {
        this.$dom = $dom;
    }
}


// コレクションパネルを管理するクラス
class CollectionPanel {
    constructor ($window, $photosStage, $menuBar) {
        this.$window = $window;
        this.photosStage = new PhotosStage($photosStage);
        this.menuBar = new MenuBar($menuBar);
    }
}
