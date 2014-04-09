$(document).ready(function(){
	init();
});

function init(){

    var windowHeight = document.documentElement.clientHeight;
    var lastHeight = $("div.article:last").outerHeight(true);
    console.log(lastHeight);
    $('div.spacer').css("height",windowHeight - 130);
    $('div.spacer-last').css("height",windowHeight - lastHeight);

    var queue = new createjs.LoadQueue(true);
    queue.setMaxConnections(100);

    var manifest = [];
    for (var i in THREEWEB.works){
        manifest.push("./img/works/" + THREEWEB.works[i].MainImage);
    }

    queue.loadManifest(manifest,true);

    queue.addEventListener("complete",handleComplete);

    $('a[rel*=lightbox]').fancybox({
        'type':'inline',
        'overlayOpacity':0.0,
        'hideOnContentClick':true,
    });

    for (var i in THREEWEB.news){
        var news = THREEWEB.news[i];
        $('#news-list').append(i + " : " + news + "<br>");
    }

    function handleComplete(event){
        var j = 0;
        for (var i = 0; i < 12; ++i){
            var work = THREEWEB.works[i];
            var card = $("<div>")
                .addClass("works-card")
                .css('opacity',0);
            if (i % 3 == 2){
                card.addClass("works-card-return");
            }
            if (work.Show){
                card
                    .css("background-image","url(./img/works/"+work.MainImage+")");
                var base = $("<div>")
                    .addClass("card-title-base")
                    .appendTo(card);
                var title = $("<div>")
                    .addClass("card-title")
                    .append(work.Title)
                    .appendTo(base);

                var a = $("<a>").attr("href","./work.html?id="+i).attr("data-num",j);
                a.append(card);
                $("#works-footer-spacer").before(a);
            }
            else{
                card
                    .css("background-color",THREEWEB.temp_colors[i]);
                var base = $("<div>")
                    .addClass("card-title-base")
                    .appendTo(card);
                var title = $("<div style='text-align:center;'>")
                    .addClass("card-title")
                    .append("<img class='comingsoon-image' src='./img/coming_soon_w.png'><br>")
                    .append("coming soon...")
                    .appendTo(base);
                $("#works-footer-spacer").before(card);

            }
            card.stop().animate({opacity: 1},2000);
        }

        initEvent();
        initAnchorEvent();
    }
}

function initEvent(){

    $("section.contents").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        var num = $(this).attr("name");
        if (isInView){
            if (num == 0){
                //console.log("hide");
                $("div#submenu").stop().animate({
                    opacity: 0,
                    marginLeft: -30
                }, 400, function(){$("div#submenu").hide()});
                $("div#footer").stop().animate({
                    opacity: 0,
                    bottom: -43
                }, 400);
                // $("div#sublogo").stop().animate({
                //     marginLeft: -43,
                //     opacity: 0
                // }, 400);
                $("div.each-submenu").fadeOut(400);
            }
            else{
                //console.log("show");
                $("div#submenu").stop().show().animate({
                    opacity: 1.0,
                    marginLeft: 18
                }, 400);
                $("div#footer").stop().animate({
                    opacity: 1.0,
                    bottom: 0
                }, 400);
                // $("div#sublogo").stop().animate({
                //     marginLeft: 5,
                //     opacity: 1.0
                // }, 400);
                $("div.each-submenu[name!="+num+"]").fadeOut(400);
                $("div.each-submenu[name="+num+"]").fadeIn(400);
            }
        }
    });
    $("div.article").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        //console.log($(this).attr("id") + ":" +isInView + "/" + visiblePartY); 
        if (isInView && visiblePartY == 'bottom'){
            $("div.submenu-menu-item").removeClass("submenu-menu-select");
            var id = $(this).attr("id");
            $("div.submenu-menu-item a[href=#"+id+"]").parent().addClass("submenu-menu-select");
        }
    });

}