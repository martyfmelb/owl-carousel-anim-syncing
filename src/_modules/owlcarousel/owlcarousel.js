'use strict';

require('../../../node_modules/gsap/CSSPlugin');
var CSSPlugin = window.GreenSockGlobals.CSSPlugin;
require('../../../node_modules/gsap/TweenLite');
var TweenLite = window.GreenSockGlobals.TweenLite;
require('../../../node_modules/gsap/TimelineLite');
var TimelineLite = window.GreenSockGlobals.TimelineLite;
var OwlCarousel = require('../../vendor/owlcarousel2/owl.carousel');

// Constructor
var exports = function(el, config) {
  var $el = $(el);
  var $owlCarousel = $el.find('.owl-carousel');
  $owlCarousel.owlCarousel(config);

  var $owlStage = $el.find('.owl-stage');

  function repaint() {
    var transformString = window.getComputedStyle($owlStage.get(0)).transform;
    var carouselScrollLeftStringMatch = transformString.match(/matrix\(.*,.*,.*,.*,(.*),.*\)/) ||
      transformString.match(/matrix3d\(.*,.*,.*,.*,.*,.*,.*,.*,.*,.*,.*,.*,(.*),.*,.*,.*\)/);
    var carouselScrollLeft = parseInt(carouselScrollLeftStringMatch ? carouselScrollLeftStringMatch[1] : 0, 10);

    var i = 0;

    $el.find('[data-mf-owl-carousel-slow-scrolling]').each(function() {
      var $scrollDifferently = $(this);

      var $parentSlide = $scrollDifferently.data('originalParent');
      var parentSlideIndex = $scrollDifferently.data('originalParentIndex');
      var parentSlideWidth = window.parseInt($parentSlide.attr('style') ? $parentSlide.attr('style').match(/width: ([0-9]+)px/)[1] : 0, 10);
      var parentSlideLeft = parentSlideIndex * parentSlideWidth;

      var progressAmount = Math.min(Math.max((parentSlideLeft + carouselScrollLeft) / parentSlideWidth / 2 + 0.5, 0), 1);
      var tl = $scrollDifferently.data('tl');
      tl.progress(progressAmount).pause();
    });
    window.requestAnimationFrame(repaint);
  }

  $el.find('[data-mf-owl-carousel-slow-scrolling]').each(function() {
    var $popItOut = $(this);
    $popItOut.data('originalParent', $popItOut.closest('.owl-item'));
    $popItOut.data('originalParentIndex', $popItOut.closest('.owl-item').prevAll().length);
    $el.append($popItOut);

    var $heading = $popItOut.find('h2');
    var $runningHeading = $popItOut.find('h3');
    var tl = new TimelineLite();
    tl.from($heading, 0.5, {x: -100, y: 0, force3D: true, opacity: 0});
    tl.from($runningHeading, 0.5, {x: 0, y: 0, force3D: true, opacity: 0}, '-=0.5');
    tl.to($heading, 0.5, {x: 100, y: 0, force3D: true, opacity: 0});
    tl.to($runningHeading, 0.5, {x: 0, y: 0, force3D: true, opacity: 0}, '-=0.5');
    $popItOut.data('tl', tl);

  });

  window.requestAnimationFrame(repaint);
};

module.exports = exports;
