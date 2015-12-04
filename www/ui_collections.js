// UI関連
var cp;  // collection panel

$(function () {
    var $menuBar     = $('#apphead');
    var $photosStage = $('#appbody');
    cp = new CollectionPanel($(window), $photosStage, $menuBar);
})
