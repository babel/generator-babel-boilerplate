(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.<%= exportVarName %> = factory();
  }
})(this, function() {
  'use strict';

  // @include ./another.js
  // @include ./index.js
  
  return <%= exportVarName %>;
});
