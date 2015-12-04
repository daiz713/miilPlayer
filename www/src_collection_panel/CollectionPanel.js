class PhotosStage {
    constructor ($dom) {
        this.$dom = $dom;
    }
}

class MenuBar {
    constructor ($dom) {
        this.$dom = $dom;
    }
}

class CollectionPanel {
    constructor ($window, $photosStage, $menuBar) {
        this.$window = $window;
        this.photosStage = new PhotosStage($photosStage);
        this.menuBar = new MenuBar($menuBar);
    }
}
