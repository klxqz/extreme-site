//global variables
var responsiveflag = false;

$(document).ready(function() {
    $("#htmlcontent_home").insertBefore(".block-cms-fb");
    $(".sf-menu > li > a").wrapInner("<strong></strong>");
    $("#homepage-slider .homeslider-description b").wrapInner("<span></span>");
    $(".shopping_cart > a:first-child b").wrapInner("<em></em>");
    $(".new-label, .sale-label").addClass("buzz-out");



    highdpiInit();
    responsiveResize();
    $(window).resize(responsiveResize);
    if (navigator.userAgent.match(/Android/i))
    {
        var viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
        window.scrollTo(0, 1);
    }
    blockHover();
    quick_view();
    dropDown();
    bindGrid();

});

function highdpiInit()
{
    if ($('.replace-2x').css('font-size') == "1px")
    {
        var els = $("img.replace-2x").get();
        for (var i = 0; i < els.length; i++)
        {
            src = els[i].src;
            extension = src.substr((src.lastIndexOf('.') + 1));
            src = src.replace("." + extension, "2x." + extension);

            var img = new Image();
            img.src = src;
            img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
        }
    }
}

function responsiveResize()
{
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

function blockHover(status)
{
    $(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e) {

        if ('ontouchstart' in document.documentElement)
            return;
        if ($('body').find('.container').width() == 1170)
        {
           $(this).parent().addClass('hovered');
        }
    });

    $(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e) {
        if ($('body').find('.container').width() == 1170)
            $(this).parent().removeClass('hovered').removeAttr('style');
    });
}

function quick_view()
{
    $(document).on('click', '.quick-view:visible', function(e)
    {
        e.preventDefault();
        var url = this.href;

            $.fancybox({
                'padding': 0,
                'width': 1087,
                'height': 610,
                'type': 'iframe',
                'href': url + '?content_only=1'
            });
    });
}

function bindGrid()
{
    var view = $.totalStorage('display');
    if (!view) {
        view = 'list';
    }
    if (view && view != 'grid') {
        display(view);
    } else {
        $('.display').find('li#grid').addClass('selected');
    }
    $(document).on('click', '#grid', function(e) {
        e.preventDefault();
        display('grid');
    });

    $(document).on('click', '#list', function(e) {
        e.preventDefault();
        display('list');
    });
}

function display(view)
{
    var nbItemsPerLine = 3;
    var nbItemsPerLineTablet = 2;
    if (view == 'list')
    {
        $('ul.product_list').removeClass('grid').addClass('list row');
        $('.product_list > li').removeClass('col-xs-12 col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine).addClass('col-xs-12');
        $('.product_list > li').each(function(index, element) {
            html = '';
            html = '<div class="product-container"><div class="row">';
            html += '<div class="left-block col-xs-4 col-xs-5 col-md-4">' + $(element).find('.left-block').html() + '</div>';
            html += '<div class="center-block col-xs-4 col-xs-7 col-md-4">';
            html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
            var rating = $(element).find('.comments_note').html(); // check : rating
            if (rating != null) {
                html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">' + rating + '</div>';
            }
            html += '<p class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
            var colorList = $(element).find('.color-list-container').html();
            if (colorList != null) {
                html += '<div class="color-list-container">' + colorList + '</div>';
            }
            var availability = $(element).find('.availability').html();	// check : catalog mode is enabled
            if (availability != null) {
                html += '<span class="availability">' + availability + '</span>';
            }
            html += '</div>';
            html += '<div class="right-block col-xs-4 col-xs-12 col-md-4"><div class="right-block-content row">';
            var price = $(element).find('.content_price').html();       // check : catalog mode is enabled
            if (price != null) {
                html += '<div class="content_price col-xs-5 col-md-12">' + price + '</div>';
            }
            html += '<div class="button-container col-xs-7 col-md-12">' + $(element).find('.button-container').html() + '</div>';
            html += '<div class="functional-buttons clearfix col-sm-12">' + $(element).find('.functional-buttons').html() + '</div>';
            html += '</div>';
            html += '</div></div>';
            $(element).html(html);
        });
        $('.display').find('li#list').addClass('selected');
        $('.display').find('li#grid').removeAttr('class');
        $.totalStorage('display', 'list');
    }
    else
    {
        $('ul.product_list').removeClass('list').addClass('grid row');
        $('.product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine);
        $('.product_list > li').each(function(index, element) {
            html = '';
            html += '<div class="product-container">';
            html += '<div class="left-block">' + $(element).find('.left-block').html() + '</div>';
            html += '<div class="right-block">';
            html += '<div class="product-flags">' + $(element).find('.product-flags').html() + '</div>';
            html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
            var rating = $(element).find('.comments_note').html(); // check : rating
            if (rating != null) {
                html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">' + rating + '</div>';
            }
            html += '<p itemprop="description" class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
            var price = $(element).find('.content_price').html(); // check : catalog mode is enabled
            if (price != null) {
                html += '<div class="content_price">' + price + '</div>';
            }
            html += '<div itemprop="offers" itemscope itemtype="http://schema.org/Offer" class="button-container">' + $(element).find('.button-container').html() + '</div>';
            var colorList = $(element).find('.color-list-container').html();
            if (colorList != null) {
                html += '<div class="color-list-container">' + colorList + '</div>';
            }
            var availability = $(element).find('.availability').html(); // check : catalog mode is enabled
            if (availability != null) {
                html += '<span class="availability">' + availability + '</span>';
            }
            html += '</div>';
            html += '<div class="functional-buttons clearfix">' + $(element).find('.functional-buttons').html() + '</div>';
            html += '</div>';
            $(element).html(html);
        });
        $('.display').find('li#grid').addClass('selected');
        $('.display').find('li#list').removeAttr('class');
        $.totalStorage('display', 'grid');
    }
}

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
/*
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
 })*/