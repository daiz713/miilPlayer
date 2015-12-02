"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuBar = (function () {
    function MenuBar($dom) {
        _classCallCheck(this, MenuBar);

        this.$dom = $dom;
    }

    _createClass(MenuBar, [{
        key: "hide",
        value: function hide() {
            this.$dom.fadeOut();
        }
    }, {
        key: "show",
        value: function show() {
            this.$dom.fadeIn();
        }
    }]);

    return MenuBar;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MiilPlayer = (function () {
    function MiilPlayer($window, $photoPanel, $menuBar, $pagerBar) {
        _classCallCheck(this, MiilPlayer);

        this.photoPanel = new PhotoPanel($photoPanel);
        this.menuBar = new MenuBar($menuBar);
        this.pagerBar = new PagerBar($pagerBar);
        this.$window = $window;
        this.timer = null;
        this._init();
        this.bindEvents();
        this.INTERVAL = 5000;
    }

    _createClass(MiilPlayer, [{
        key: 'hideBars',
        value: function hideBars() {
            this.menuBar.hide();
            this.pagerBar.hide();
        }
    }, {
        key: 'showBars',
        value: function showBars() {
            this.menuBar.show();
            this.pagerBar.show();
        }
    }, {
        key: 'showItems',
        value: function showItems(apiUrl) {
            var self = this;
            var photo_stock = [];
            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiUrl, true);
            xhr.responseType = 'json';
            xhr.onload = function (e) {
                var res = this.response;
                var photos = res.photo.photos;
                for (var i = 0; i < photos.length; i++) {
                    var photo = photos[i].photo_url;
                    var page = photos[i].page_url;
                    photo_stock.push({ photo: photo, page: page });
                }
                // 初期collectionを登録
                self.photoPanel.setCollection(photo_stock);
                // 初期画像を表示
                self.showNextItem();
                self.startSlideShow();
            };
            xhr.send();
        }

        // 自動スライドショーを開始する
    }, {
        key: 'startSlideShow',
        value: function startSlideShow() {}

        // 自動スライドショーを解除する
    }, {
        key: 'clearSlideShow',
        value: function clearSlideShow() {}

        // 次の写真を表示する
        // NOTE: center-button管理する
    }, {
        key: 'showNextItem',
        value: function showNextItem() {
            var item = this.photoPanel.getItemIndexOf(this.nextItemIdx);
            var n = true;
            if (item !== null) {
                this.nextItemIdx++;
                this.photoPanel._showPhoto(item);
                this.pagerBar.updateProgressBarByArrIdx(this.nextItemIdx, this.photoPanel.collection.length);
            } else {
                n = false;
            }
            if (this.nextItemIdx >= this.photoPanel.collection.length) {
                n = false;
                this.pagerBar.setCenterBtnIcon('av:replay');
            }
            return n;
        }

        // 前の写真を表示する
    }, {
        key: 'showPrevItem',
        value: function showPrevItem() {
            var n = true;
            if (this.nextItemIdx - 2 >= 0) {
                var idx = this.nextItemIdx - 2;
                var item = this.photoPanel.getItemIndexOf(idx);
                if (item !== null) {
                    this.nextItemIdx--;
                    this.photoPanel._showPhoto(item);
                    this.pagerBar.updateProgressBarByArrIdx(this.nextItemIdx, this.photoPanel.collection.length);
                } else {
                    n = false;
                }
            } else {
                n = false;
            }
            return n;
        }
    }, {
        key: '_init',
        value: function _init() {
            this.nextItemIdx = 0;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            // 次の写真を表示する要求
            this.pagerBar.skipNextBtn().on('click', function (e) {
                _this.showNextItem();
            });

            // 前の写真を表示する要求
            this.pagerBar.skipPrevBtn().on('click', function (e) {
                _this.showPrevItem();
            });

            this.pagerBar.centerBtn().on('click', function (e) {
                // collectionをreplyする
                if (_this.pagerBar.centerBtn()[0].icon === 'av:replay') {
                    //this.pagerBar.centerBtn()[0].icon = 'av:pause';
                    _this.nextItemIdx = 0;
                    _this.showNextItem();
                    _this.startSlideShow();
                }
            });

            // 写真がホバーされた場合，ホバーが外された場合
            $('body').on('mouseenter', function (e) {
                if (document.hasFocus()) _this.showBars();
            }).on('mouseleave', function (e) {
                _this.hideBars();
            });

            // 左右矢印ボタンで写真遷移
            $(window).on('keyup', function (e) {
                _this.hideBars();
                var c = e.keyCode;
                if (c === 39) {
                    // `→`
                    _this.showNextItem();
                } else if (c === 37) {
                    // `←`
                    _this.showPrevItem();
                }
            });
        }
    }]);

    return MiilPlayer;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PagerBar = (function () {
    function PagerBar($dom) {
        _classCallCheck(this, PagerBar);

        this.$dom = $dom;
    }

    _createClass(PagerBar, [{
        key: 'skipNextBtn',
        value: function skipNextBtn() {
            return this.$dom.find('#btn-next');
        }
    }, {
        key: 'skipPrevBtn',
        value: function skipPrevBtn() {
            return this.$dom.find('#btn-prev');
        }
    }, {
        key: 'centerBtn',
        value: function centerBtn() {
            return this.$dom.find('#btn-center');
        }
    }, {
        key: 'setCenterBtnIcon',
        value: function setCenterBtnIcon(icon) {
            this.$dom.find('#btn-center')[0].icon = icon;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$dom.fadeOut();
        }
    }, {
        key: 'show',
        value: function show() {
            this.$dom.fadeIn();
        }

        // PhotoPanel.collectionのidxによって，プログレスバーを更新する
    }, {
        key: 'updateProgressBarByArrIdx',
        value: function updateProgressBarByArrIdx(idx, len) {
            var value = idx;
            var max = len;
            var $progressbar = this.$dom.find('#progress');
            $progressbar[0].max = max;
            $progressbar[0].value = value;
        }
    }]);

    return PagerBar;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PhotoPanel = (function () {
    function PhotoPanel($dom) {
        _classCallCheck(this, PhotoPanel);

        this.$dom = $dom;
        this.collection = [];
        this.bindEvents();
    }

    _createClass(PhotoPanel, [{
        key: '_showPhoto',
        value: function _showPhoto(item) {
            //this.$dom.find('#photoview').css({'display': 'none'});
            this.$dom.find('#photoview')[0].src = item.photo_uri;
            this.$dom[0].dataset.page = item.page_uri || '';
            //this.$dom.find('#photoview').fadeIn('slow');
        }

        // 正方形になるように表示する
    }, {
        key: '_setSize',
        value: function _setSize(width, height) {
            var a = width < height ? width : height;
            console.info(a);
            window.resizeTo(a, a);
            this.$dom.find('#photoview').css({
                'width': a + 'px',
                'height': a + 'px'
            });
        }
    }, {
        key: 'getItemIndexOf',
        value: function getItemIndexOf(idx) {
            return this.collection[idx] || null;
        }

        // Playerによって再生される一連の写真
    }, {
        key: 'setCollection',
        value: function setCollection(items) {
            var _this = this;

            items.forEach(function (item) {
                var res = {};
                res.photo_uri = item.photo;
                res.page_uri = item.page;
                _this.collection.push(res);
            });
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            this.$dom.on('click', function (e) {
                window.open(e.target.dataset.page);
            });
        }
    }]);

    return PhotoPanel;
})();

