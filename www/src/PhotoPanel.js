class PhotoPanel {
    constructor ($dom) {
        this.$dom = $dom;
        this.collection = [];
    }

    _showPhoto (uri) {
        this.$dom.css({'display': 'none'});
        this.$dom.css({'background-image': 'url(' + uri + ')'});
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

}
