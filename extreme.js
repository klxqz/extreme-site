var responsiveflagMenu = false;
$(document).ready(function() {
    responsiveMenu();
    $(window).resize(responsiveMenu);
});

// check resolution
function responsiveMenu() {
    if ($(document).width() <= 767 && responsiveflagMenu == false) {
        menuChange('enable');
        responsiveflagMenu = true;
    } else if ($(document).width() >= 768) {
        menuChange('disable');
        responsiveflagMenu = false;
    }
}

function reconstruct(index) {
    var item = $("#block_top_menu ul.sf-menu > li").eq(index);
    $('<li class="dots"><a><i class="icon-align-justify"></i></a><ul></ul></li>').insertBefore(item);
    $("#block_top_menu ul.sf-menu > li.dots > ul").append($('.dots').nextAll("#block_top_menu ul.sf-menu > li"));
}

// init Super Fish Menu for 767px+ resolution
function desktopInit() {
    $('.sf-contener .cat-title').off();
    $('.sf-contener .cat-title').removeClass('active');
    $('.sf-menu > li > ul').removeClass('menu-mobile').parent().find('.menu-mobile-grover').remove();
    $('.sf-menu').removeAttr('style');

    if ($("#block_top_menu ul.sf-menu > li.dots").length) {
        $("#block_top_menu ul.sf-menu").append($("#block_top_menu ul.sf-menu > li.dots > ul").html());
        $("#block_top_menu ul.sf-menu > li.dots").remove();
    }


    var width_menu = $('#block_top_menu ul.sf-menu').width();
    var ul_width = 0;
    var index = 0;
    $("#block_top_menu ul.sf-menu > li").each(function(){
        if (!index && ul_width + $(this).width() + 50 > width_menu) {
            index = $("#block_top_menu ul.sf-menu > li").index($(this));
        }
        ul_width += $(this).width();
    });
    if (index) {
        reconstruct(index);
    }

    $('ul.sf-menu').superfish('init');
    //add class for width define
    $('.sf-menu > li > ul').addClass('submenu-container clearfix');
    // loop through each sublist under each top list item
    $('.sf-menu > li > ul').each(function() {
        i = 0;
        //add classes for clearing
        $(this).each(function() {
            if ($(this).attr('id') != "category-thumbnail") {
                i++;
                if (i % 2 == 1)
                    $(this).addClass('first-in-line-xs');
                else if (i % 5 == 1)
                    $(this).addClass('first-in-line-lg');
            }
        });
    });
}

function mobileInit() {
    $('ul.sf-menu').superfish('destroy');
    $('.sf-menu').removeAttr('style');

    $('.sf-contener .cat-title').on('click', function() {
        $(this).toggleClass('active').parent().find('ul.menu-content').stop().slideToggle('medium');
    });

    $('.sf-menu > li > ul').addClass('menu-mobile clearfix').parent().prepend('<span class="menu-mobile-grover"></span>');

    $(".sf-menu .menu-mobile-grover").on('click touchstart', function() {
        var catSubUl = $(this).next().next('.menu-mobile');
        if (catSubUl.is(':hidden')) {
            catSubUl.slideDown();
            $(this).addClass('active');
        } else {
            catSubUl.slideUp();
            $(this).removeClass('active');
        }
        return false;
    });

    if ('ontouchstart' in document.documentElement) {
        $('#block_top_menu > ul:first > li > a').on('click', function(e) {
            if ($(this).parent('li').find('ul').length)
                e.preventDefault();
        });
    }
}

// change the menu display at different resolutions
function menuChange(status) {
    status == 'enable' ? mobileInit() : desktopInit();
}


$(document).ready(function() {
    $("#htmlcontent_home").insertBefore(".block-cms-fb");
    $(".sf-menu > li > a").wrapInner("<strong></strong>");
    $("#homepage-slider .homeslider-description b").wrapInner("<span></span>");
    $(".shopping_cart > a:first-child b").wrapInner("<em></em>");
    $(".new-label, .sale-label").addClass("buzz-out");

    responsiveResize();
    $(window).resize(responsiveResize);
    if (navigator.userAgent.match(/Android/i)) {
        var viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
        window.scrollTo(0, 1);
    }

    dropDown();
});

function dropDown() {
    elementClick = '#header .current';
    elementSlide = 'ul.toogle_content';
    activeClass = 'active';

    $(elementClick).on('click', function(e) {
        e.stopPropagation();
        var subUl = $(this).next(elementSlide);
        if (subUl.is(':hidden')) {
            subUl.slideDown();
            $(this).addClass(activeClass);
        } else {
            subUl.slideUp();
            $(this).removeClass(activeClass);
        }
        $(elementClick).not(this).next(elementSlide).slideUp();
        $(elementClick).not(this).removeClass(activeClass);
        e.preventDefault();
    });

    $(elementSlide).on('click', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', function(e) {
        e.stopPropagation();
        var elementHide = $(elementClick).next(elementSlide);
        $(elementHide).slideUp();
        $(elementClick).removeClass('active');
    });
}

function responsiveResize() {
    var responsiveflag = false;
    if ($(document).width() <= 767 && responsiveflag == false) {
        accordion('enable');
        accordionFooter('enable');
        responsiveflag = true;
    } else if ($(document).width() >= 768) {
        accordion('disable');
        accordionFooter('disable');
        responsiveflag = false;
    }
}



function accordionFooter(status) {
    if (status == 'enable') {
        $('#footer .footer-block h4').on('click', function() {
            $(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
        })
        $('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
    } else {
        $('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
        $('#footer').removeClass('accordion');
    }
}

//   TOGGLE COLUMNS
function accordion(status) {
    leftColumnBlocks = $('#left_column');
    if (status == 'enable') {
        $(leftColumnBlocks).remove();
        $(leftColumnBlocks).insertAfter('#center_column').find('#categories_block_left ul.block_content').slideToggle('fast');
        //$.uniform.update("#layered_form input[type='checkbox'], #layered_form input[type='radio'], select.form-control");
        if (typeof (categoryReload) != 'undefined') {
            categoryReload()
        }
        if (typeof (sliderList) != 'undefined') {
            initSliders()
        }
        $('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').on('click', function() {
            $(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
        })
        $('#right_column, #left_column').addClass('accordion').find('.block:not(#layered_block_left) .block_content').slideUp('fast');
    } else {
        $(leftColumnBlocks).remove();
        $(leftColumnBlocks).insertBefore('#center_column');
        //$.uniform.update("#layered_form input[type='checkbox'], #layered_form input[type='radio'], select.form-control");
        if (typeof (categoryReload) != 'undefined') {
            categoryReload()
        }
        if (typeof (sliderList) != 'undefined') {
            initSliders()
        }
        $('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
        $('#left_column, #right_column').removeClass('accordion');
    }
}




jQuery(function($) {
    $(document).ready(function() {
        var docWidth = $('body').find('.container').width();
        if (docWidth > 780) {
            $('body').find('.row-top').addClass('stickUpTop');
            $('.stickUpTop').stickUp();
        }
    });
});


$(document).ready(function() {
    if (use_uniform) {
        $("select,input:not([type=submit],[type=button],.comparator),textarea").uniform();
    } else {
        $("input[type='text'], input[type='password'], textarea, select").addClass('form-control');
    }
    $("input[type='submit'], input[type='button'], button").addClass('bt button');    

    function HoverWatcher(selector) {
        this.hovering = false;
        var self = this;
        this.isHoveringOver = function() {
            return self.hovering;
        }
        $(selector).hover(function() {
            self.hovering = true;
        }, function() {
            self.hovering = false;
        })
    }
    var cart_block = new HoverWatcher('#header .cart_block');
    var shopping_cart = new HoverWatcher('#header .shopping_cart');

    $("#header .shopping_cart a:first").hover(
            function() {
                $("#header .cart_block").stop(true, true).slideDown(450);
            },
            function() {
                setTimeout(function() {
                    if (!shopping_cart.isHoveringOver() && !cart_block.isHoveringOver())
                        $("#header .cart_block").stop(true, true).slideUp(450);
                }, 200);
            }
    );

    $("#header .cart_block").hover(
            function() {
            },
            function() {
                setTimeout(function() {
                    if (!shopping_cart.isHoveringOver())
                        $("#header .cart_block").stop(true, true).slideUp(450);
                }, 200);
            }
    );

    $(".cart_block_list").on('click', '.products .ajax_cart_block_remove_link', function() {
        var product_block = $(this).closest('dt');
        var cart_total = $(".shopping_cart");
        $.post(cart_url + 'delete/', {
            id: product_block.data('id')
        }, function(response) {
            if (response.status == 'ok') {
                product_block.remove();
                cart_total.find('.ajax_block_cart_total').html(response.data.total);
                cart_total.find('.ajax_cart_quantity').html(response.data.count);
                cart_total.find('.ajax_cart_discount').html(response.data.discount);
                if (!response.data.count) {
                    cart_total.find('.ajax_cart_no_product').removeClass('unvisible');
                    cart_total.find('.ajax_cart_product_txt_s').addClass('unvisible');
                    cart_total.find('.ajax_cart_quantity').addClass('unvisible');
                }
            }
        }, 'json');
        return false;
    });

});
