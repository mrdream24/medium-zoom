/*!
 * 
 *    medium-zoom v0.2.5
 *    Medium-like zoom on your pictures in pure JavaScript
 *    Copyright (c) 2016 mrdream
 *    https://github.com/francoischalifour/medium-zoom
 *    MIT license
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("medium-zoom", [], factory);
	else if(typeof exports === 'object')
		exports["medium-zoom"] = factory();
	else
		root["medium-zoom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Adds a zoom effect on a selection of images when clicked.
	 *
	 * @param {(string|Object[])} [selector] The images to apply the zoom to
	 * @param {number} [options.margin=0] Space outside the zoomed image
	 * @param {string} [options.background="#fff"] The color of the overlay
	 * @param {number} [options.scrollOffset=48] Number of pixels to scroll to dismiss the zoom
	 * @param {boolean} [options.metaClick=true] Enables the action on meta click
	 */
	
	if (!Array.prototype.includes) {
	  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
	    'use strict';
	
	    if (this == null) {
	      throw new TypeError('Array.prototype.includes called on null or undefined');
	    }
	
	    var O = Object(this);
	    var len = parseInt(O.length, 10) || 0;
	    if (len === 0) {
	      return false;
	    }
	    var n = parseInt(arguments[1], 10) || 0;
	    var k;
	    if (n >= 0) {
	      k = n;
	    } else {
	      k = len + n;
	      if (k < 0) {
	        k = 0;
	      }
	    }
	    var currentElement;
	    while (k < len) {
	      currentElement = O[k];
	      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
	        // NaN !== NaN
	        return true;
	      }
	      k++;
	    }
	    return false;
	  };
	}
	
	var mediumZoom = function mediumZoom(selector) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var _ref$margin = _ref.margin;
	  var margin = _ref$margin === undefined ? 0 : _ref$margin;
	  var _ref$background = _ref.background;
	  var background = _ref$background === undefined ? '#fff' : _ref$background;
	  var _ref$scrollOffset = _ref.scrollOffset;
	  var scrollOffset = _ref$scrollOffset === undefined ? 48 : _ref$scrollOffset;
	  var _ref$metaClick = _ref.metaClick;
	  var metaClick = _ref$metaClick === undefined ? true : _ref$metaClick;
	
	  var SUPPORTED_FORMATS = ['IMG', 'PICTURE', 'SVG'];
	  var KEY_ESC = 27;
	  var KEY_Q = 81;
	  var CANCEL_KEYS = [KEY_ESC, KEY_Q];
	
	  var isSupported = function isSupported(img) {
	    return SUPPORTED_FORMATS.includes(img.tagName);
	  };
	  var isScaled = function isScaled(img) {
	    return img.naturalWidth !== img.width;
	  };
	  var isArrayLike = function isArrayLike(item) {
	    return !!item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.length && typeof item.length === 'number' && item.length > 0;
	  };
	
	  var getImages = function getImages() {
	    try {
	      return Array.isArray(selector) ? selector.filter(isSupported) : isArrayLike(selector) ? [].concat(_toConsumableArray(selector)).filter(isSupported) : typeof selector === 'string' ? [].concat(_toConsumableArray(document.querySelectorAll(selector))).filter(isSupported) : [].concat(_toConsumableArray(document.querySelectorAll(SUPPORTED_FORMATS.map(function (attr) {
	        return attr.toLowerCase();
	      }).join(',')))).filter(isScaled);
	    } catch (err) {
	      console.log(err);
	      throw new SyntaxError('[medium-zoom] Unknown selector when applying the zoom.' + 'Expects a CSS selector, an array-like or an array.' + 'Check https://github.com/francoischalifour/medium-zoom for more.');
	    }
	  };
	
	  var createOverlay = function createOverlay() {
	    var overlay = document.createElement('div');
	    overlay.classList.add('medium-zoom-overlay');
	    overlay.style.backgroundColor = options.background;
	
	    return overlay;
	  };
	
	  var zoom = function zoom() {
	    if (!target) return;
	
	    var event = new Event('show');
	    target.dispatchEvent(event);
	
	    scrollTop = document.body.scrollTop;
	    isAnimating = true;
	
	    document.body.appendChild(overlay);
	
	    requestAnimationFrame(function () {
	      document.body.classList.add('medium-zoom--open');
	    });
	
	    target.classList.add('medium-zoom-image--open');
	
	    target.addEventListener('transitionend', onZoomEnd);
	
	    animateTarget();
	  };
	
	  var zoomOut = function zoomOut() {
	    if (!target) return;
	
	    var event = new Event('hide');
	    target.dispatchEvent(event);
	
	    setTimeout(function () {
	      isAnimating = true;
	      document.body.classList.remove('medium-zoom--open');
	      target.style.transform = 'none';
	
	      target.addEventListener('transitionend', onZoomOutEnd);
	    }, 150);
	  };
	
	  var triggerZoom = function triggerZoom(event) {
	    if (!target) {
	      target = event ? event.target : images[0];
	      zoom();
	    } else {
	      zoomOut();
	    }
	  };
	
	  var update = function update() {
	    var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    options = _extends({}, options, newOptions);
	
	    if (options.background) {
	      overlay.style.backgroundColor = options.background;
	    }
	
	    return options;
	  };
	
	  var addEventListeners = function addEventListeners(type, listener) {
	    images.forEach(function (image) {
	      image.addEventListener(type, listener);
	    });
	  };
	
	  var onClick = function onClick(event) {
	    if (event.metaKey || event.ctrlKey) {
	      if (options.metaClick) {
	        return window.open(event.target.getAttribute('data-original') || event.target.parentNode.href || event.target.src, '_blank');
	      }
	    }
	
	    event.preventDefault();
	
	    triggerZoom(event);
	  };
	
	  var onZoomEnd = function onZoomEnd() {
	    isAnimating = false;
	    target.removeEventListener('transitionend', onZoomEnd);
	
	    var event = new Event('shown');
	    target.dispatchEvent(event);
	  };
	
	  var onZoomOutEnd = function onZoomOutEnd() {
	    if (!target) return;
	
	    document.body.removeChild(overlay);
	    target.classList.remove('medium-zoom-image--open');
	
	    isAnimating = false;
	    target.removeEventListener('transitionend', onZoomOutEnd);
	
	    var event = new Event('hidden');
	    target.dispatchEvent(event);
	
	    target = null;
	  };
	
	  var onScroll = function onScroll() {
	    if (isAnimating || !target) return;
	
	    if (Math.abs(scrollTop - document.body.scrollTop) > options.scrollOffset) {
	      zoomOut();
	    }
	  };
	
	  var onDismiss = function onDismiss(event) {
	    if (CANCEL_KEYS.includes(event.keyCode || event.which)) {
	      zoomOut();
	    }
	  };
	
	  var animateTarget = function animateTarget() {
	    if (!target) return;
	
	    var windowWidth = document.body.clientWidth || window.innerWidth;
	    var windowHeight = document.documentElement.clientHeight || window.innerHeight;
	
	    var viewportWidth = windowWidth - options.margin * 2;
	    var viewportHeight = windowHeight - options.margin * 2;
	
	    var _target = target;
	    var width = _target.width;
	    var height = _target.height;
	    var _target$naturalWidth = _target.naturalWidth;
	    var naturalWidth = _target$naturalWidth === undefined ? +Infinity : _target$naturalWidth;
	    var _target$naturalHeight = _target.naturalHeight;
	    var naturalHeight = _target$naturalHeight === undefined ? +Infinity : _target$naturalHeight;
	
	    var _target$getBoundingCl = target.getBoundingClientRect();
	
	    var top = _target$getBoundingCl.top;
	    var left = _target$getBoundingCl.left;
	
	    var isCenterAligned = Math.abs(windowWidth / 2 - (left + width / 2)) <= 10;
	
	    var scaleX = Math.min(naturalWidth, viewportWidth) / width;
	    var scaleY = Math.min(naturalHeight, viewportHeight) / height;
	    var scale = Math.min(scaleX, scaleY) || 1;
	    var translateX = isCenterAligned ? 0 : (-left + (viewportWidth - width) / 2) / scale;
	    var translateY = (-top + (viewportHeight - height) / 2 + options.margin) / scale;
	
	    target.style.transform = 'scale(' + scale + ') translate3d(' + translateX + 'px, ' + translateY + 'px, 0)';
	  };
	
	  var options = {
	    margin: parseInt(margin) || 0,
	    background: background,
	    scrollOffset: parseInt(scrollOffset) || 48,
	    metaClick: metaClick
	  };
	
	  if (selector instanceof Object) {
	    options = _extends({}, options, selector);
	  }
	
	  var images = getImages(selector);
	  var overlay = createOverlay();
	
	  var target = null;
	  var scrollTop = 0;
	  var isAnimating = false;
	
	  images.forEach(function (elem) {
	    elem.classList.add('medium-zoom-image');
	    elem.addEventListener('click', onClick);
	  });
	  overlay.addEventListener('click', zoomOut);
	  document.addEventListener('scroll', onScroll);
	  document.addEventListener('keyup', onDismiss);
	  window.addEventListener('resize', zoomOut);
	
	  return {
	    show: triggerZoom,
	    hide: zoomOut,
	    toggle: triggerZoom,
	    update: update,
	    addEventListeners: addEventListeners,
	    images: images,
	    options: options
	  };
	};
	
	if (typeof window !== 'undefined') {
	  window.mediumZoom = mediumZoom;
	} else if (module && module.exports) {
	  module.exports = mediumZoom;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=medium-zoom.js.map