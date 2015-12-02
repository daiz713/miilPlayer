class MenuBar {
    constructor ($dom) {
        this.$dom = $dom;
        this.bindEvents();
    }

    hide () {
        this.$dom.fadeOut();
    }

    show () {
        this.$dom.fadeIn();
    }

    openPage (uri) {
        if (uri !== '' && uri !== '#') {
            window.open(uri);
        }
    }

    bindEvents () {
        // ユーザボタン
        this.$dom.find('#btn_user_photos').on('click', e => {
            var userName = 'daiz'; //決め打ち
            var apiUrl = 'http://localhost:3000/miilusers/' + userName + '.json';
            mp.showItemsByAPI(apiUrl);
        });

        // ウェブにアクセスボタン
        this.$dom.find('#btn_open_page').on('click', e => {
            var pageUrl = $('#photo')[0].dataset.page;
            this.openPage(pageUrl);
        });
    }
}
