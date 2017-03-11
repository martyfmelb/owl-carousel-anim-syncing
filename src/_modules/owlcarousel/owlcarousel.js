'use strict';

var OwlCarousel = require('../../vendor/owlcarousel2/owl.carousel');

// Constructor
var exports = function(el, config) {
  $(el).find('.owl-carousel').owlCarousel(config);
};

module.exports = exports;
