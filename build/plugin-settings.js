/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/plugin-settings.js":
/*!********************************!*\
  !*** ./src/plugin-settings.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_wordpress_components_build_style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/@wordpress/components/build-style/style.css */ "./node_modules/@wordpress/components/build-style/style.css");
/* harmony import */ var _styles_settings_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/settings.scss */ "./src/styles/settings.scss");
/* harmony import */ var _scripts_settings_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/settings/index */ "./src/scripts/settings/index.js");




/***/ }),

/***/ "./src/scripts/settings/components.js":
/*!********************************************!*\
  !*** ./src/scripts/settings/components.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropDownEl": function() { return /* binding */ DropDownEl; },
/* harmony export */   "Element": function() { return /* binding */ Element; },
/* harmony export */   "Field": function() { return /* binding */ Field; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./src/scripts/settings/index.js");






const Field = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("tr", {
    style: {
      display: 'table-row',
      borderSpacing: '0 1em'
    },
    className: props.name + '-item'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("th", {
    scope: "row",
    style: {
      padding: '16px 8px 16px'
    }
  }, props.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(Element, props)));
};
const DropDownEl = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
    position: "bottom right",
    renderToggle: _ref => {
      let {
        isOpen,
        onToggle
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
        type: 'hidden',
        name: props.name,
        value: props.value
      }), props.html, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
        isLink: true,
        onClick: onToggle,
        "aria-expanded": isOpen
      }, props.displayValue));
    },
    renderContent: () => props.component
  });
};
const Element = _ref2 => {
  let {
    data,
    name,
    title,
    component,
    validation
  } = _ref2;
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(_index__WEBPACK_IMPORTED_MODULE_4__.pluginOptions[name]);
  function validate(newData, validator) {
    console.log(newData, validator);
    if (typeof validator !== 'undefined') {
      const regex = new RegExp(validator.pattern.value, 'g');
      if (!regex.test(newData)) {
        data.className = 'invalid';
        data.help = validator.pattern.message;
      } else {
        data.className = 'valid';
        data.help = '';
      }
    }
    setValue(newData);
  }

  // will set the default value for the input
  const inputProps = {
    ...data,
    id: name,
    name,
    onChange: v => validate(v, validation)
  };
  switch (component) {
    case 'input':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        value: value
      }));
    case 'textarea':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        value: value
      }));
    case 'range':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        value: parseFloat(value, 2)
      }));
    case 'select':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        selected: value
      }));
    case 'radio':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        selected: value
      }));
    case 'checkbox':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CheckboxControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        checked: value,
        onChange: () => validate(v => !v, validation)
      }));
    case 'toggle':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        label: name,
        checked: value,
        onChange: () => validate(v => !v, validation)
      }));
    case 'tree':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TreeSelect, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        selected: value
      }));
    case 'color-picker':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(DropDownEl, {
        component: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
          color: value
        })),
        name: name,
        html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          className: 'color-preview',
          style: {
            backgroundColor: value || 'initial',
            height: '1rem',
            width: '1rem',
            marginRight: '.25rem',
            display: 'inline-block'
          }
        }),
        displayValue: value,
        value: value
      });
    case 'date':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(DropDownEl, {
        component: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.DatePicker, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
          currentDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.date)(value || new Date())
        })),
        name: name,
        displayValue: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.date)('d.m.Y H:i', value, 0),
        value: value
      });
    case 'time':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(DropDownEl, {
        component: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TimePicker, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
          currentDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.date)(value || new Date())
        })),
        name: name,
        displayValue: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.date)('d.m.Y H:i', value, 0),
        value: value
      });
    case 'datetime':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(DropDownEl, {
        component: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.DateTimePicker, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
          currentDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.date)(value || new Date())
        })),
        name: name,
        displayValue: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.date)('d.m.Y H:i', value, 0),
        value: value
      });
    case 'button':
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, inputProps, {
        text: title,
        onClick: () => window.open(data.action, '_blank')
      }));
    default:
      return null;
  }
};

/***/ }),

/***/ "./src/scripts/settings/index.js":
/*!***************************************!*\
  !*** ./src/scripts/settings/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsForm": function() { return /* binding */ SettingsForm; },
/* harmony export */   "formWrap": function() { return /* binding */ formWrap; },
/* harmony export */   "pluginOptions": function() { return /* binding */ pluginOptions; },
/* harmony export */   "pluginSettings": function() { return /* binding */ pluginSettings; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./src/scripts/settings/components.js");
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/fetch */ "./src/scripts/utils/fetch.js");

var _piSettings$saved, _document$getElementB;

/* global piSettings */





const pluginSettings = piSettings.settings;
const pluginOptions = (_piSettings$saved = piSettings.saved) !== null && _piSettings$saved !== void 0 ? _piSettings$saved : {};
const SettingsForm = props => {
  const {
    fields,
    section,
    page
  } = props !== null && props !== void 0 ? props : {};
  const [wait, setWait] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const formName = page + '-settings';

  /**
   * It takes the form data, merges it with the existing plugin options, and then sends it to the server to be saved
   *
   * @param {Object} formData - The data from the form.
   */
  function storeOptions(formData) {
    setWait(true);
    const newSettings = {
      ...pluginOptions,
      ...formData
    };
    (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_5__.updateOption)(newSettings, piSettings.nonce).then(() => {
      return setWait(false);
    }).catch(err => console.log(err));
  }

  /**
   * `handleSubmit` is a function that takes an event as an argument, prevents the default action of the event, creates an object from the form data, and then stores the object in local storage
   *
   * @param {Event} event - The event object that is passed to the event handler.
   */
  function handleSubmit(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new window.FormData(event.target));
    storeOptions(formData);
  }

  /**
   * If the user presses the `Ctrl` or `Cmd` key and the `s` key, then prevent the default action of the browser (which is to save the page), and instead save the form data to the browser's storage
   *
   * @param {Event} event - The event object that was triggered.
   */
  function onkeydown(event) {
    const charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === 's') {
      event.preventDefault();
      const formData = Object.fromEntries(new window.FormData(document.getElementById(formName)));
      storeOptions(formData);
    }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("form", {
    method: "post",
    action: 'options.php',
    id: formName,
    onKeyDown: onkeydown,
    onSubmit: handleSubmit,
    className: 'card'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, section), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("table", {
    className: section + '-table',
    role: "presentation",
    title: section
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("tbody", null, fields ? fields.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components__WEBPACK_IMPORTED_MODULE_4__.Field, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    key: index
  }, item))) : null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    type: "submit",
    className: "button button-primary"
  }, wait ? '⏰ ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Submit')));
};
const formWrap = (_document$getElementB = document.getElementById('plugin-settings')) !== null && _document$getElementB !== void 0 ? _document$getElementB : {};
wp.element.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(SettingsForm, {
  fields: pluginSettings,
  section: 'section',
  page: 'page'
}), formWrap);

/***/ }),

/***/ "./src/scripts/utils/fetch.js":
/*!************************************!*\
  !*** ./src/scripts/utils/fetch.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "queryData": function() { return /* binding */ queryData; },
/* harmony export */   "queryPost": function() { return /* binding */ queryPost; },
/* harmony export */   "updateOption": function() { return /* binding */ updateOption; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default().createNonceMiddleware(window.piSettings.nonce));
function updateOption(options, nonce) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: '/plugin/v1/settings',
    method: 'POST',
    data: {
      options,
      nonce
    }
  });
}
function queryPost(args, nonce) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: '/plugin/v1/manager/query',
    method: 'POST',
    data: {
      args,
      nonce
    }
  });
}
function queryData(datatype, nonce) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: '/plugin/v1/manager/data',
    method: 'POST',
    data: {
      datatype,
      nonce
    }
  });
}

/***/ }),

/***/ "./node_modules/@wordpress/components/build-style/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/components/build-style/style.css ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/settings.scss":
/*!**********************************!*\
  !*** ./src/styles/settings.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"plugin-settings": 0,
/******/ 			"./style-plugin-settings": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpluginui"] = self["webpackChunkpluginui"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-plugin-settings"], function() { return __webpack_require__("./src/plugin-settings.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=plugin-settings.js.map