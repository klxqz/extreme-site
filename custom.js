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

});
