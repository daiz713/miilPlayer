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

    bindEvents () {
        this.$dom.find('#btn_use_photos').on('click', e => {
            var userName = 'daiz'; //決め打ち
            var apiUrl = 'http://localhost:3000/miilusers/' + userName + '.json';
            mp.showItemsByAPI(apiUrl);
        });
    }
}
