"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = viewport;
function viewport() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight);

  var left = window.pageXOffset || document.documentElement.scrollLeft;
  var top = window.pageYOffset || document.documentElement.scrollTop;

  var right = left + width;
  var bottom = top + height;

  return { top: top, right: right, bottom: bottom, left: left, width: width, height: height };
}