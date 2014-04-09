$(document).ready(function(){
    initAnchorEvent();
    $('#form-accept').click(function(){
        $('#form-reply-no').remove();
        return true;
    });
    $('#form-decline').click(function(){
        $('#form-reply-yes').remove();
        return true;
    });

});
function initAnchorEvent(){
    console.log("init");
    $('a[href^=#]').click(function() {
        console.log("click");
        // スクロールの速度
        var speed = 1200; // ミリ秒
        // アンカーの値取得
        var href= $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').stop().animate({scrollTop:position + 1}, speed, 'easeInOutCubic');
        return false;
   });
}