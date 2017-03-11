// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// Globally-available
window.jQuery = window.$ = require('jquery');

var OwlCarousel = require('../_modules/owlcarousel/owlcarousel');

$(function() {
  var directives = [
    {selector: '[data-mf-owl-carousel]', class: OwlCarousel, configAttr: 'data-mf-owl-carousel'}
  ];

  directives.forEach(function(directive) {
    $(directive.selector).each(function() {
      var configAttr = $(this).attr(directive.configAttr);
      var config = configAttr ? JSON.parse(configAttr) : undefined;
      new directive.class(this, config);
    });
  });
});
