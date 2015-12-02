class PhotoPanel {
    constructor ($dom) {
        this.$dom = $dom;
        this.collection = [];
        this.bindEvents();
    }

    _showPhoto (item) {
        this.$dom.css({'background-image': ''});
        this.$dom.css({'display': 'none'});
        this.$dom.css({'background-image': 'url(' + item.photo_uri + ')'});
        this.$dom[0].dataset.page = item.page_uri || '';
        this.$dom.fadeIn('slow');
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
