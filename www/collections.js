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
                var api = e.target.dataset.api + '/';
                // miniPlayerを開く
                chrome.runtime.sendMessage({
                    type: 'openMiniPlayer',
                    collection_name: title,
                    api: api
                }, null);
            });
        }
    }]);

    return PhotosStage;
})();

var MenuBar = (function () {
    function MenuBar($dom) {
        _classCallCheck(this, MenuBar);

        this.$dom = $dom;
        this.bindEvents();
    }

    // コレクションパネルを管理するクラス

    _createClass(MenuBar, [{
        key: 'makeBtnActive',
        value: function makeBtnActive($btn) {
            var btns = this.$dom[0].querySelectorAll('paper-icon-button');
            for (var i = 0; i < btns.length; i++) {
                $(btns[i]).removeClass('cb-a');
            }
            $btn.addClass('cb-a');
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            this.$dom.on('click', 'paper-icon-button', function (e) {
                var $btn = $(e.target).closest('paper-icon-button');
                _this.makeBtnActive($btn);
            });
        }
    }]);

    return MenuBar;
})();

var CollectionPanel = (function () {
    function CollectionPanel($window, $photosStage, $menuBar) {
        _classCallCheck(this, CollectionPanel);

        this.$window = $window;
        this.$menuBar = $menuBar;
        this.$photosStage = $photosStage;
        this.photosStage = new PhotosStage($photosStage);
        this.menuBar = new MenuBar($menuBar);
        this.apiBase = 'http://localhost:3000/';
        this.bindEvents();
    }

    // カードDOMオブジェクトをつくる

    _createClass(CollectionPanel, [{
        key: 'createCard',
        value: function createCard(names, api, cover, fg) {
            if (fg === null || fg === undefined) fg = true;
            var card = document.createElement('div');
            card.className = 'card';
            var cardview = document.createElement('webview');
            cardview.id = 'card_' + Math.floor(Math.random() * 100000);
            cardview.className = 'cardview';
            cardview.src = cover;
            cardview.style.visibility = fg === true ? 'visible' : 'hidden';
            var cardtitle = document.createElement('div');
            cardtitle.className = 'cardtitle';
            cardtitle.dataset.name = names[0];
            cardtitle.dataset.api = api;
            cardtitle.appendChild(document.createTextNode(names[1]));

            card.appendChild(cardview);
            card.appendChild(cardtitle);

            return card;
        }
    }, {
        key: 'insertCard',
        value: function insertCard(card) {
            this.$photosStage[0].appendChild(card);
        }

        // ステージをクリア
    }, {
        key: 'clearPhotoStage',
        value: function clearPhotoStage() {
            this.$photosStage.html('');
        }

        // APIを叩いてリストを表示する
    }, {
        key: 'callListsAPI',
        value: function callListsAPI(api) {
            var self = this;
            var apiUrl = this.apiBase + api + '/';
            var xhr = new XMLHttpRequest();
            xhr.open('GET', apiUrl, true);
            xhr.responseType = 'json';
            xhr.onload = function (e) {
                var res = this.response;
                self._showCategoryListsByAPI(res, api);
            };
            xhr.onerror = function () {};
            xhr.send();
        }
    }, {
        key: '_showCategoryListsByAPI',
        value: function _showCategoryListsByAPI(json, api) {
            var self = this;
            console.warn(json);
            var list = json.list;
            list.forEach(function (li) {
                // サブカテゴリは無視する
                var id = li.category_id;
                var name = li.name;
                var card = self.createCard([id, name], api, '', false);
                card.style.backgroundImage = 'url(photos/genre2/' + id + '.jpg)';
                self.insertCard(card);
            });
        }

        // APIごとのローカルサンプルを表示する
    }, {
        key: 'showLocalSamples',
        value: function showLocalSamples(api) {
            if (api === 'creations') {
                var card = this.createCard(['Sample', 'Sample'], api, sampleBase64Photos[0]);
                this.insertCard(card);
            } else if (api === 'miilusers') {
                var card = this.createCard(['daiz', 'daiz'], api, sampleBase64Photos[1]);
                this.insertCard(card);
            }
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this2 = this;

            // 一覧表示のボタン郡がクリックされたとき
            this.$menuBar.on('click', 'paper-icon-button', function (e) {
                var $btn = $(e.target).closest('paper-icon-button');
                var api = $btn[0].id;
                _this2.clearPhotoStage();
                _this2.showLocalSamples(api);
                if (api === 'miilcategories') {
                    _this2.callListsAPI(api);
                }
            });
        }
    }]);

    return CollectionPanel;
})();

