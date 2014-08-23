$(document).ready(function() {
    $("#htmlcontent_home").insertBefore(".block-cms-fb");
    $(".sf-menu > li > a").wrapInner("<strong></strong>");
    $("#homepage-slider .homeslider-description b").wrapInner("<span></span>");
    $(".shopping_cart > a:first-child b").wrapInner("<em></em>");
    $(".new-label, .sale-label").addClass("buzz-out");

    responsiveResize();
    $(window).resize(responsiveResize);
    if (navigator.userAgent.match(/Android/i))
    {
        var viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
        window.scrollTo(0, 1);
    }
    
    dropDown();
});

function dropDown()
{
    elementClick = '#header .current';
    elementSlide = 'ul.toogle_content';
    activeClass = 'active';

    $(elementClick).on('click', function(e) {
        e.stopPropagation();
        var subUl = $(this).next(elementSlide);
        if (subUl.is(':hidden'))
        {
            subUl.slideDown();
            $(this).addClass(activeClass);
        }
        else
        {
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

function responsiveResize()
{
    var responsiveflag = false;
    if ($(document).width() <= 767 && responsiveflag == false)
    {
        accordion('enable');
        accordionFooter('enable');
        responsiveflag = true;
    }
    else if ($(document).width() >= 768)
    {
        accordion('disable');
        accordionFooter('disable');
        responsiveflag = false;
    }
}



function accordionFooter(status)
{
    if (status == 'enable')
    {
        $('#footer .footer-block h4').on('click', function() {
            $(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
        })
        $('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
    }
    else
    {
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

/* Stik Up menu script */

(function($) {
    $.fn.tmStickUp = function(options) {

        var getOptions = {
            correctionSelector: $('.correctionSelector')
        }
        $.extend(getOptions, options);

        var
                _this = $(this)
                , _window = $(window)
                , _document = $(document)
                , thisOffsetTop = 0
                , thisOuterHeight = 0
                , thisMarginTop = 0
                , thisPaddingTop = 0
                , documentScroll = 0
                , pseudoBlock
                , lastScrollValue = 0
                , scrollDir = ''
                , tmpScrolled
                ;

        init();
        function init() {
            thisOffsetTop = parseInt(_this.offset().top);
            thisMarginTop = parseInt(_this.css("margin-top"));
            thisOuterHeight = parseInt(_this.outerHeight(true));

            $('<div class="pseudoStickyBlock"></div>').insertAfter(_this);
            pseudoBlock = $('.pseudoStickyBlock');
            pseudoBlock.css({"position": "relative", "display": "block"});
            addEventsFunction();
        }//end init

        function addEventsFunction() {
            _document.on('scroll', function() {
                tmpScrolled = $(this).scrollTop();
                if (tmpScrolled > lastScrollValue) {
                    scrollDir = 'down';
                } else {
                    scrollDir = 'up';
                }
                lastScrollValue = tmpScrolled;

                correctionValue = getOptions.correctionSelector.outerHeight(true);
                documentScroll = parseInt(_window.scrollTop());

                if (thisOffsetTop - correctionValue < documentScroll) {
                    _this.addClass('isStuck');
                    _this.css({position: "fixed", top: correctionValue});
                    pseudoBlock.css({"height": thisOuterHeight});
                } else {
                    _this.removeClass('isStuck');
                    _this.css({position: "relative", top: 0});
                    pseudoBlock.css({"height": 0});
                }
            }).trigger('scroll');
        }
    }//end tmStickUp function
})(jQuery)




$(document).ready(function() {
    var stickMenu = true;
    var docWidth = $('body').find('.container').width();
    if (stickMenu && docWidth > 780) {
        $('body').find('.row-top').addClass('stickUpTop');
        $('.stickUpTop').tmStickUp();
    }
})


$(document).ready(function() {
    $("input[type='text'], textarea, select").addClass('form-control');
    $("input[type='submit'], button").addClass('bt button');

    function HoverWatcher(selector)
    {
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


    $("#first-currencies a").click(function() {
        var url = location.href;
        if (url.indexOf('?') == -1) {
            url += '?';
        } else {
            url += '&';
        }
        location.href = url + 'currency=' + $(this).data('code');
        return false;
    });


    $(".cart_block_list").on('click', '.products .ajax_cart_block_remove_link', function() {
        var product_block = $(this).closest('dt');
        var cart_total = $(".shopping_cart");
        $.post(cart_url + 'delete/', {id: product_block.data('id')}, function(response) {
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
