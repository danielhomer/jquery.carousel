/**=============================
 * ========= Carousel ==========
 * ============================= 
 * 
 * Version: 0.3
 * Requires: jQuery
 * Author: Daniel Homer
 * Website: http://danielhomer.me
 * 
 * */

(function ($) {

    $.fn.Carousel = function (args) {

        var carousel = this;

        $.extend(carousel, {
            
            args: args,
            
            init: function() {
                carousel.cleanWhitespace();
                carousel.bindButtons();
            },
            
            cleanWhitespace: function() {
                textNodes = this.contents().filter(function() { 
                    return (this.nodeType == 3 && !/\S/.test(this.nodeValue));
                }).remove();
                return this;
            },
            
            bindButtons: function() {
                var leftEl,
                    rightEl;
                
                leftEl = carousel.args.slideLeft || '.speaker-carousel-left';
                rightEl = carousel.args.slideRight || '.speaker-carouse-left';
                
                $(leftEl).on('click', carousel.slideLeft);
                $(rightEl).on('click', carousel.slideRight);
            },
            
            tileWidth: function() {
                return carousel.children().eq(0).outerWidth(true);
            },
            
            getScrollOffset: function (direction) {
                var width;
                width = carousel.tileWidth() * (direction === 'left' ? 1 : -1);
                return carousel.scrollLeft() + width;
            },
            
            slideLeft: function() {
                carousel.animate(
                    { scrollLeft: carousel.getScrollOffset('left') }, 
                    carousel.args.speed,
                    carousel.slideCallback
                );
            },
            
            slideRight: function() {
                carousel.animate(
                    { scrollLeft: carousel.getScrollOffset('right') }, 
                    carousel.args.speed,
                    carousel.slideCallback
                );
            },

            slideCallback: function() {
                console.log(carousel.tilesShowing());
                console.log(carousel.isNearTheEnd());
            },

            isNearTheEnd: function() {
                var lastVisibleTile,
                    tilesShowing;

                tilesShowing = carousel.tilesShowing();

                lastVisibleTile = tilesShowing[tilesShowing.length - 1];

                if (lastVisibleTile >= carousel.children().length - 2) {
                    return true;
                }

                return false;
            },

            maxVisibleTiles: function() {
                return Math.ceil(carousel.width() / carousel.tileWidth());
            },

            tilesShowing: function() {
                var currentlyVisible = [],
                    i = 0;

                currentlyVisible.push(Math.floor(carousel.scrollLeft() / carousel.tileWidth()));

                for (i = 0; i < carousel.maxVisibleTiles() - 1; i++) {
                    currentlyVisible.push(Math.floor(currentlyVisible[i] + 1));
                }

                return currentlyVisible;
            }
            
        });
        
        carousel.init();

    };

})(jQuery);

$(document).on('ready', function () {
    $('.speaker-carousel').Carousel({
        speed: 250,
        slideLeft: '#slideleft',
        slideRight: '#slideright'
    });
});