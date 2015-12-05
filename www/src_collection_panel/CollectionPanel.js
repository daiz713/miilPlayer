// コレクションリストを管理するクラス
class PhotosStage {
    constructor ($dom) {
        this.$dom = $dom;
        this.bindEvents();
    }

    bindEvents () {
        // コレクションカードのタイトル領域をクリックされたとき
        this.$dom.on('click', '.cardtitle', e => {
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
}

// コレクションパネルのメニュー操作を管理するクラス
class MenuBar {
    constructor ($dom) {
        this.$dom = $dom;
        this.bindEvents();
    }

    makeBtnActive ($btn) {
        var btns = (this.$dom)[0].querySelectorAll('paper-icon-button');
        for (var i = 0; i < btns.length; i++) {
            $(btns[i]).removeClass('cb-a');
        }
        $btn.addClass('cb-a');
    }

    bindEvents () {
        this.$dom.on('click', 'paper-icon-button', e => {
            var $btn = $(e.target).closest('paper-icon-button');
            this.makeBtnActive($btn);
        });
    }
}


// コレクションパネルを管理するクラス
class CollectionPanel {
    constructor ($window, $photosStage, $menuBar) {
        this.$window = $window;
        this.$menuBar = $menuBar;
        this.$photosStage = $photosStage;
        this.photosStage = new PhotosStage($photosStage);
        this.menuBar = new MenuBar($menuBar);
        this.apiBase = 'http://localhost:3000/';
        this.bindEvents();
    }

    // カードDOMオブジェクトをつくる
    createCard (names, api, cover, fg) {
        if (fg === null || fg === undefined) fg = true;
        var card = document.createElement('div');
        card.className = 'card';
        var cardview = document.createElement('webview');
        cardview.id = 'card_' + Math.floor(Math.random() * 100000);
        cardview.className = 'cardview';
        cardview.src = cover;
        cardview.style.visibility = (fg === true) ? 'visible' : 'hidden';
        var cardtitle = document.createElement('div');
        cardtitle.className = 'cardtitle';
        cardtitle.dataset.name = names[0];
        cardtitle.dataset.api = api;
        cardtitle.appendChild(document.createTextNode(names[1]));

        card.appendChild(cardview);
        card.appendChild(cardtitle);

        return card;
    }

    insertCard (card) {
        this.$photosStage[0].appendChild(card);
    }

    // ステージをクリア
    clearPhotoStage () {
        this.$photosStage.html('');
    }

    // APIを叩いてリストを表示する
    callListsAPI (api) {
        var self = this;
        var apiUrl = this.apiBase + api + '/';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl, true);
        xhr.responseType = 'json';
        xhr.onload = function (e) {
            var res = this.response;
            self._showCategoryListsByAPI(res, api);
        }
        xhr.onerror = function () {
        }
        xhr.send();
    }

    _showCategoryListsByAPI (json, api) {
        var self = this;
        console.warn(json);
        var list = json.list;
        list.forEach(function (li) {
            // サブカテゴリは無視する
            var id = li.category_id;
            var name = li.name;
            var card = self.createCard([id, name], api, '', false);
            card.style.backgroundImage = 'url(photos/genre/'+ id +'.png)';
            self.insertCard(card);
        });
    }

    // APIごとのローカルサンプルを表示する
    showLocalSamples (api) {
        if (api === 'creations') {
            var card = this.createCard(['Sample', 'Sample'], api, sampleBase64Photos[0]);
            this.insertCard(card);
        }else if (api === 'miilusers') {
            var card = this.createCard(['daiz', 'daiz'], api, sampleBase64Photos[1]);
            this.insertCard(card);
        }
    }

    bindEvents () {
        // 一覧表示のボタン郡がクリックされたとき
        this.$menuBar.on('click', 'paper-icon-button', e => {
            var $btn = $(e.target).closest('paper-icon-button');
            var api = $btn[0].id;
            this.clearPhotoStage();
            this.showLocalSamples(api);
            if (api === 'miilcategories') {
                this.callListsAPI(api);
            }
        });
    }
}
