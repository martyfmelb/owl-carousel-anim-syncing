'use strict';

//require('../../../node_modules/velocity-animate/velocity');
var OwlCarousel = require('../../vendor/owlcarousel2/owl.carousel');

// Constructor
var exports = function(el, config) {
  var $el = $(el);
  var $owlCarousel = $el.find('.owl-carousel');
  $owlCarousel.owlCarousel(config);

  var $owlStage = $el.find('.owl-stage');

  function repaint() {
    var transformString = window.getComputedStyle($owlStage.get(0)).transform;
    var carouselScrollLeftStringMatch = transformString.match(/matrix\(.*,.*,.*,.*,(.*),.*\)/);
    var carouselScrollLeft = parseInt(carouselScrollLeftStringMatch ? carouselScrollLeftStringMatch[1] : 0, 10);

    $el.find('[data-mf-owl-carousel-slow-scrolling]').each(function() {
      var $scrollDifferently = $(this);
      var $parentSlide = $scrollDifferently.data('originalParent');
      var parentSlideIndex = $scrollDifferently.data('originalParentIndex');
      var parentSlideWidth = window.parseInt($parentSlide.attr('style') ? $parentSlide.attr('style').match(/width: ([0-9]+)px/)[1] : 0, 10);
      var parentSlideLeft = parentSlideIndex * parentSlideWidth;
      $scrollDifferently.css({
        'transform': 'translate3d(' + Math.round(carouselScrollLeft + parentSlideLeft) / 4 + 'px, 0px, 0px)',
        'opacity': 1 - Math.abs(parentSlideLeft + carouselScrollLeft) / 500
      });
    });
    window.requestAnimationFrame(repaint);
  }

  $el.find('[data-mf-owl-carousel-slow-scrolling]').each(function() {
    var $popItOut = $(this);
    $popItOut.data('originalParent', $popItOut.closest('.owl-item'));
    $popItOut.data('originalParentIndex', $popItOut.closest('.owl-item').prevAll().length);
    $el.append($popItOut);
  });

  window.requestAnimationFrame(repaint);
};

module.exports = exports;
