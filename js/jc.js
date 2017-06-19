/**
 * Created by Administrator on 2017/1/16.
 */
$(function () {
    $("#imCarl4").slider({slider: false,fade:true});//淡入淡出信息栏
    $("#imCarl1").slider();//警营之星
    $("#imCarl3").slider();//大轮播
    $("#imCarl2").aPlay();//商家展示

    //微信固定到浏览器
    function windPopu() {
        if($(window).width()<=1274){
            $(".cg-fltwidw").css({'left':$(window).width()-42+'px','margin-left':0+'px'});
        }else{
            $(".cg-fltwidw").css({'left':50+'%','margin-left':605+'px'})
        }
    }
    $(window).on("resize",windPopu);
    windPopu();

    /**
     * tab切换
     */
    function tabShift(tabLi, contents, clazz,event){
        var event    = event || "mouseover";
        var tabTimer = null;
        tabLi.on(event,function () {
            var _this = $(this);
            var i     = $(this).index();
            function way() {
                _this.addClass(clazz).siblings().removeClass(clazz);
                contents.eq(i).show().siblings().hide();
            }
            tabTimer = setTimeout(way,200);
        });
    }

    //信息排行
    tabShift($("#iTabs1 .cm-tabs1 li"), $("#iTabs1 .cm-boxul ul"), "z-hover1");

    /**
     * 字数限制
     */
    function txtLimit(node,num){
        for (var i = 0; i < node.length; i++) {
            var old_str = node.eq(i).text();
            if(old_str.length > num){
                new_str = old_str.substring(0, num)+"...";
                node.eq(i).text(new_str);
            }
        }
    }
    txtLimit($(".im-ct1 .cu-p1"),115);
    txtLimit($(".im-ct1 .cu-h2"),15);
    txtLimit($("#imCarl4 .carousel-img .cm-hdct1 .cu-h1 a"),25);//信息滚动处
    txtLimit($(".picsm-ct1 .picsm-item .picsm-item-ct .cu-p3"),38);//图片细览文本
    txtLimit($(".xlm-ct3 .cu-p5"),170);//细览的阅读下一篇

    /*
    * 搜索框
    */
    function searchBox(searchDiv,txtValue){
        searchDiv.focus(function() {
            if($(this).val() == txtValue){
                $(this).val("");
            }
        }).blur(function() {
            if($(this).val() == ""){
                $(this).val(txtValue);
            }
        });
    }
    searchBox($(".txm-search .tx-sch-text"),"搜索多个条件时用空格隔开");

    /* 内容下滑 */
    function subNavdp(subNavId, liStyle) {
        $(subNavId).on("click", function(event) {
            event.stopPropagation();
            if ($(this).has("ul").length) {
                if($(this).children("ul").css("display") == "block"){
                    $(this).children("ul").slideUp();
                    $(this).removeClass(liStyle);
                }else {
                    $(this).addClass(liStyle).siblings().removeClass(liStyle);
                    $(this).children("ul").slideDown();
                    $(this).siblings().children("ul").slideUp();
                }
            }
        });
        $(subNavId).parents("body").click(function () {
            $(subNavId).children("ul").slideUp();
            $(subNavId).removeClass(liStyle);
        });
    }
    subNavdp($("#iSlider1 .cm-friselect"), "z-clk1");
});

/*
* 信息检索页 */
$(function () {
    // 搜索类型下拉框
    var $infoSchList = $('.info-sch-form .type-select .list');
    var $infoSchType = $('.info-sch-form .type-select .value');

    $('.info-sch-form .type-select .list li').click(function () {
        $infoSchType.html($(this).html());
        $infoSchList.hide();
    });
    $infoSchType.click(function (e) {
        e.stopPropagation();
        e.cancelBubble = false;
        $infoSchList.toggle();
        $(document).click(function() {
            if($infoSchList.css('display') === 'block') {
                $infoSchList.hide();
                $(document).off('click');
            }
        })
    });

    // 搜索结果关键词变色
    var keyWord = $('.info-sch-result .tip .key .keyword').html();
    $('.info-sch-result .result-item').each(function () {
        var reg = new RegExp(keyWord, 'g');
        $(this).html($(this).html().replace(reg, '<span class="key">'+ keyWord +'</span>'));
    });

});
/**
 * 信息检索页结束
 */

/**
 * 信息排行页
 */
$(function () {
    var trs = $(".xxph").find("tr");
    trs.not(trs.eq(0)).not(trs.eq(1)).each(function () {
        if ($(this).index() % 2 === 0) {
            $(this).css("background-color", "#f9fcfe")
        }
    })
});
/**
 * 信息排行页结束
 */


;(function ($) {
    //轮播插件
    $.fn.slider = function (options) {

        var defaults = {
            fade: false,
            slider: true,
            buttonsct: false
        }

        var opts = $.extend(defaults, options);
        var carouselId = $(this);
        var bCarousel  = carouselId.children(".carousel-img");
        var carouselli = bCarousel.children();
        var bImgWidth  = carouselli.width();
        var spans      = carouselId.find(".carousel-span .carousel-span-infor a");
        var buttons    = carouselId.find(".carousel-buttons a");
        var nownum     = carouselId.find(".carousel-buttons .now");
        var totalnum   = carouselId.find(".carousel-buttons .total");
        var pre        = carouselId.children(".pre");
        var next       = carouselId.children(".next");
        var len        = bCarousel.children().length;
        var i          = 0;
        var timer      = null;
        nownum.text(1);
        totalnum.text(len);

        buttons.parent().width(buttons.length*buttons.innerWidth());
        if (opts.buttonsct) {
            buttons.parent().css({"margin-left": -buttons.parent().width()/2});
        }

        return $(this).each(function () {

            //左右滚动
            if (opts.slider) {
                bCarousel.width(len*bImgWidth);
                //上一张按钮
                pre.click(function () {
                    makeSlider(-1, 1);
                });

                //下一张
                next.click(function () {
                    makeSlider(1, 1);
                });

                function makeSlider(direct, distanceNum) {

                    if (!bCarousel.is(":animated")) {

                        //向上循环
                        if (direct < 0) {

                            i = i - distanceNum;
                            if (i <= -1) {
                                i = len - 1;
                            }
                            //无缝循环
                            for (var kk = 0; kk < distanceNum; kk++) {
                                bCarousel.prepend(bCarousel.children("li").eq(len - 1));
                            }
                            bCarousel.css('left', -distanceNum * bImgWidth);
                            bCarousel.animate({'left': 0}, 600);

                        } else {//向下循环
                            i = i + distanceNum;
                            if (i >= len) {
                                i = 0;
                            }
                            bCarousel.animate({"left": -distanceNum * bImgWidth}, 600, function () {

                                //无缝循环
                                for (var kk = 0; kk < distanceNum; kk++) {
                                    bCarousel.append(bCarousel.children("li").eq(0));
                                }
                                bCarousel.css('left', 0);
                            });
                        }
                        //文本，按钮样式
                        buttons.eq(i).addClass("carousel-btn-act").siblings().removeClass("carousel-btn-act");
                        spans.eq(i).show().siblings().hide();
                        nownum.text(i + 1);
                        return true;
                    } else return false;
                }

                //按钮按动
                buttons.each(function () {
                    $(this).click(function () {
                        var btnIndex = $(this).index();//当前点击的小圆点序号
                        var distan = btnIndex - i;
                        var flag = true;
                        if (distan == -(len - 1)) {
                            flag = makeSlider(1, 1);
                        } else {
                            if (distan < 0) {
                                flag = makeSlider(-1, Math.abs(distan));//上一张
                            } else if (distan > 0) {
                                flag = makeSlider(1, Math.abs(distan));//下一张
                            } else return false;
                        }
                        if (flag) {
                            i = btnIndex;
                        }
                    });
                });

                //移入移出设置清除定时器
                carouselId.hover(function () {
                    clearInterval(timer);
                }, function () {
                    timer = setInterval(function () {
                        makeSlider(1, 1);
                    }, 3000);
                });

                //设置定时器
                timer = setInterval(function () {
                    makeSlider(1, 1);
                }, 3000);

            }else if(opts.fade){
                //上一张
                pre.click(function () {
                    fadeSlider(-1);
                });

                //下一张
                next.click(function () {
                    fadeSlider(1);
                });
                function fadeSlider(flag) {
                    if (!carouselli.eq(i-1).is(":animated")) {

                        //上一张
                        if(flag == 1) {
                            if (i >= len - 1) {
                                i = 0;
                            } else {
                                i++;
                            }
                        }else if (flag == -1) {//下一张
                            if (i <= 0) {
                                i = len-1;
                            }else {
                                i--;
                            }
                        }
                        fadePlay(i);
                    }
                }
                function fadePlay(index) {
                    carouselli.eq(index).stop().animate({
                        opacity: 1
                    }, 500).css({"z-index": 2}).siblings().css({
                        opacity: 0,
                        "z-index": 1
                    });
                    buttons.eq(index).addClass("carousel-btn-act").siblings().removeClass("carousel-btn-act");
                }
                //按钮
                buttons.each(function () {
                    $(this).click(function () {
                        if (!carouselli.eq(i-1).is(":animated")) {
                            var btnIndex = $(this).index();//当前点击的小圆点序号
                            fadePlay(btnIndex);
                            i = btnIndex;
                        }else return false;
                    });
                });

                //移入移出设置清除定时器
                carouselId.hover(function () {
                    clearInterval(timer);
                }, function () {
                    timer = setInterval(function () {
                        fadeSlider(1);
                    }, 3000);
                });

                //设置定时器
                timer = setInterval(function () {
                    fadeSlider(1);
                }, 3000);
            }
        });


    }
    // $("#sltmCarle1 .sltm-slider").aPlay();
    $.fn.aPlay = function (options) {
        var defaults = {
            time: "20",
            isSpeed1: 1 //2017-2-7修改为1
        };
        var opts      = $.extend(defaults,options);
        var sCarousel = $(this);
        var oPrev     = $("#ig-img .prev"); //2017-2-7修改
        var oNext     = $("#ig-img .next");//2017-2-7修改
        var Ul        = sCarousel.children().clone();
        var timerLeft = null;
        var isSpeed1  = opts.isSpeed1;
        sCarousel.width((sCarousel.children("li").length)*(sCarousel.children("li").outerWidth())*2);
        var width     = sCarousel.width();
        if (sCarousel.width() > sCarousel.parent().width()) {
            Ul.appendTo(sCarousel);
            sCarousel.width((sCarousel.children("li").length)*(sCarousel.children("li").innerWidth()));
            oPrev.click(function(){
                isSpeed1= -1;
                $(this).addClass("on").siblings().removeClass("on");//2017-2-7新增
            });
            oNext.click(function(){
                isSpeed1= 1;
                $(this).addClass("on").siblings().removeClass("on");//2017-2-7新增
            });
            function getLeft(){
                sCarousel.css("left",sCarousel.position().left+isSpeed1+'px');
                var leftCar = sCarousel.position().left;
                if(leftCar<-width/2)
                {
                    console.log(width/2);
                    sCarousel.css("left","0");
                }
                else if(leftCar>0)
                {
                    sCarousel.css("left",-width/2+'px')
                }
            }
            timerLeft=setInterval(getLeft,opts.time);
            sCarousel.mouseenter(function () {
                clearInterval(timerLeft);
            });
            sCarousel.mouseleave(function () {
                timerLeft=setInterval(getLeft,opts.time);
            });
        }

    }

})(jQuery);



// 2017-1-22新增
$(document).ready(function() {
    //    bg轮播
    var bg = $('.x7-bodybg>div');
    var bgArray = [];
    for (var i = 0; i < bg.length; i++) {
        bgArray.push(i);
    }
    var bg_num = 0;

    function bg_play() {
        if (bg_num == 3) {
            bg_num = 0;
            bg.eq(0).animate({ 'opacity': 1 }, 500).siblings().animate({ 'opacity': 0 }, 300);
        } else {
            bg.eq(bgArray[bg_num] + 1).animate({ 'opacity': 1 }, 500).siblings().animate({ 'opacity': 0 }, 300);

            bg_num++;
        }
    }
    setInterval(bg_play, 7000);
})


// 2017-2-3新增
$(document).ready(function() {
    var oUl = $(".im-ct5 .cm-list");
    var aLi = $(".im-ct5 .cm-list li");
    var next = $(".switch .next");
    var prev = $(".switch .prev");
    var top = 0;
    var speed = 40;
    var timer = null;
    var height = 0;
    var segHeight = 40;//底边距离 2017-2-8新增
    var length = $(".im-ct5 .cm-list li").length;//2017-2-8新增
    var btn = 1;
    var num = 0;
    //2017-2-8删除
    // for (var i = 1; i <= $(".im-ct5 .cm-list li").length; i++) {
    //     if (i%number == 0) {
    //         num++;
    //         $(".im-ct5 .cm-list li").eq(i-1).css("margin-bottom",bottom+"px");
    //     }
    // }
    aLi.eq(length-1).css("margin-bottom",segHeight+"px");//2017-2-8新增
    height = length*oUl.children("li").height()+segHeight;//2017-2-8修改
    oUl.append(oUl.children("li").clone());
    oUl.height(height*2);//2017-2-8新增
    next.click(function(){
        btn = 1;
    });
    prev.click(function(){
        btn = -1;
    });

    function listMarqueen(){
        top -= btn;
        oUl.css("top",top+"px");
        if (btn == 1 && top<-height) {
            top = 0;
            oUl.css("top",top+"px");
        }
        if (btn == -1 && top > 0) {
            top = -height;
            oUl.css("top",top+"px");
        }
    }
    oUl.hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(listMarqueen, speed);
    });

    timer = setInterval(listMarqueen, speed);


    //兼容ie，chrome，火狐等各版本
    // (function() {
    //     var lastTime = 0;
    //     var vendors = ["webkit", "moz"];
    //     for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    //         window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    //         // Webkit中此取消方法的名字变了
    //         window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    //     }
    //     if (!window.requestAnimationFrame) {
    //         window.requestAnimationFrame = function(callback, element) {
    //             var currTime = new Date().getTime();
    //             var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    //             var id = window.setTimeout(function() {
    //                 callback(currTime + timeToCall);
    //             }, timeToCall);
    //             lastTime = currTime + timeToCall;
    //             return id;
    //         };
    //     }
    //     if (!window.cancelAnimationFrame) {
    //         window.cancelAnimationFrame = function(id) {
    //             clearTimeout(id);
    //         };
    //     }
    // }());


    //     var oPrev = $(".switch .prev");
    //     var oNext = $(".switch .next");
    //     var oUl = $(".im-ct5 .cm-list");
    //     var progress = -1;
    //     var height = 0;
    //     var segHeight = 40;//轮播完分割距离
    //     var num = 0;
    //     var timer =null;
    //     var length = oUl.children("li").length;
    //     var ulHeight = length*oUl.children("li").height()+segHeight;
    //     oUl.find("li").eq(length-1).css("margin-bottom",segHeight+"px");
    //     oUl = oUl.append(oUl.children("li").clone());
    //     oUl.height(ulHeight*2);
    //     oPrev.click(function(){
    //         progress = -1;
    //     });
    //     oNext.click(function(){
    //         progress = 1;
    //     });
    //     oUl.hover(function(){
    //         window.cancelAnimationFrame(timer);
    //     },function(){
    //         timer = requestAnimationFrame(marProcess);
    //     })
    //     function marProcess(){
    //         window.cancelAnimationFrame(timer);
    //         var top = oUl.position().top+progress;
    //         oUl.css("top",top+"px");
    //         if (top<=-ulHeight) {
    //             oUl.css("top","0px");
    //         }else if(top>=0){
    //             oUl.css("top",-ulHeight+"px");
    //         }
    //         timer = requestAnimationFrame(marProcess);
    //     }
    //     timer = requestAnimationFrame(marProcess);


})