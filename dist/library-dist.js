(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.MyLibrary = factory(root._);
  }
})(this, function (_) {
  "use strict";

  // Place your library's code here
  //
  // If you add additional files, be sure to
  // load them in order in ./wrapper.js
  //

  var _MyLibrary = {};




  return _MyLibrary;
});
//# sourceMappingURL=library-dist.js.map