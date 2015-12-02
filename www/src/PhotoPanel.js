class PhotoPanel {
    constructor ($dom) {
        this.$dom = $dom;
        this.collection = [];
        this.bindEvents();
    }

    _init () {
        this.collection = [];
    }

    _showPhoto (item) {
        this.$dom.find('#photoview')[0].src = item.photo_uri;
        this.$dom[0].dataset.page = item.page_uri || '';
    }

    // 正方形になるように表示する
    _setSize (width, height) {
        var a = (width < height) ? width : height;
        console.info(a);
        window.resizeTo(a, a);
        this.$dom.find('#photoview').css({
            'width' : a + 'px',
            'height': a + 'px'
        });
    }

    getItemIndexOf (idx) {
        return this.collection[idx] || null;
    }

    // Playerによって再生される一連の写真
    // set関数では，最初にcollectionは初期化される
    setCollection (items) {
        this.collection = [];
        items.forEach(item => {
            var res = {};
            res.photo_uri = item.photo;
            res.page_uri = item.page;
            this.collection.push(res);
        });
    }

    bindEvents () {
        this.$dom.on('click', e => {
            window.open(e.target.dataset.page);
        });
    }

}
