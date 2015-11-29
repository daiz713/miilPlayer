class PagerBar {
    constructor ($dom) {
        this.$dom = $dom;
    }

    skipNextBtn () {
        return this.$dom.find('#btn-next');
    }

    skipPrevBtn () {
        return this.$dom.find('#btn-prev');
    }

    centerBtn () {
        return this.$dom.find('#btn-center');
    }

    setCenterBtnIcon (icon) {
        this.$dom.find('#btn-center')[0].icon = icon;
    }

    hide () {
        this.$dom.fadeOut();
    }

    show () {
        this.$dom.fadeIn();
    }

    // PhotoPanel.collectionのidxによって，プログレスバーを更新する
    updateProgressBarByArrIdx (idx, len) {
        var value = idx;
        var max = len;
        var $progressbar = this.$dom.find('#progress');
        $progressbar[0].max = max;
        $progressbar[0].value = value;
    }
}
