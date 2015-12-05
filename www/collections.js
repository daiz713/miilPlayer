// コレクションリストを管理するクラス
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PhotosStage = (function () {
    function PhotosStage($dom) {
        _classCallCheck(this, PhotosStage);

        this.$dom = $dom;
        this.bindEvents();
    }

    // コレクションパネルのメニュー操作を管理するクラス

    _createClass(PhotosStage, [{
        key: 'bindEvents',
        value: function bindEvents() {
            // コレクションカードのタイトル領域をクリックされたとき
            this.$dom.on('click', '.cardtitle', function (e) {
                var title = e.target.dataset.name;
                // miniPlayerを開く
                chrome.runtime.sendMessage({
                    type: 'openMiniPlayer',
                    collection_name: title,
                    api: 'creations/'
                }, null);
            });
        }
    }]);

    return PhotosStage;
})();

var MenuBar = function MenuBar($dom) {
    _classCallCheck(this, MenuBar);

    this.$dom = $dom;
}

// コレクションパネルを管理するクラス
;

var CollectionPanel = function CollectionPanel($window, $photosStage, $menuBar) {
    _classCallCheck(this, CollectionPanel);

    this.$window = $window;
    this.photosStage = new PhotosStage($photosStage);
    this.menuBar = new MenuBar($menuBar);
};

