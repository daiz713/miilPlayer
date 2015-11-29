class MenuBar {
    constructor ($dom) {
        this.$dom = $dom;
    }

    hide () {
        this.$dom.fadeOut();
    }

    show () {
        this.$dom.fadeIn();
    }
}
