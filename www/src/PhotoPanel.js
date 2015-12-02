class PhotoPanel {
    constructor ($dom) {
        this.$dom = $dom;
        this.collection = [];
        this.bindEvents();
    }

    _showPhoto (item) {
        this.$dom.find('#photoview').css({'display': 'none'});
        this.$dom.find('#photoview')[0].src = item.photo_uri;
        this.$dom[0].dataset.page = item.page_uri || '';
        this.$dom.find('#photoview').fadeIn('slow');
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
    setCollection (items) {
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
