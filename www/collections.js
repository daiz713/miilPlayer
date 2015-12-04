"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhotosStage = function PhotosStage($dom) {
    _classCallCheck(this, PhotosStage);

    this.$dom = $dom;
};

var MenuBar = function MenuBar($dom) {
    _classCallCheck(this, MenuBar);

    this.$dom = $dom;
};

var CollectionPanel = function CollectionPanel($window, $photosStage, $menuBar) {
    _classCallCheck(this, CollectionPanel);

    this.$window = $window;
    this.photosStage = new PhotosStage($photosStage);
    this.menuBar = new MenuBar($menuBar);
};

