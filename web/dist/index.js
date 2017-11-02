/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = function () {
    function isObject(value) {
        return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    }

    function isCallable(value) {
        return typeof value === 'function';
    }

    function isSameObjectContent(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        var keys = Object.keys(obj1);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (isObject(obj1[key]) && isObject(obj2[key])) {
                if (!isSameObjectContent(obj1[key], obj2[key])) {
                    return false;
                }
            } else if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }

    function isUndefined(value) {
        var UNDEFINED = void 0;
        return value === UNDEFINED;
    }

    function deepCopyOf(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    return { isObject: isObject, isCallable: isCallable, isSameObjectContent: isSameObjectContent, isUndefined: isUndefined, deepCopyOf: deepCopyOf };
}();

var fusonChartsOptions = ['type', 'id', 'width', 'height', 'dataFormat', 'dataSource', 'events', 'link', 'showDataLoadingMessage', 'showChartLoadingMessage', 'baseChartMessageFont', 'baseChartMessageFontSize', 'baseChartMessageColor', 'dataLoadStartMessage', 'dataLoadErrorMessage', 'dataInvalidMessage', 'dataEmptyMessage', 'typeNotSupportedMessage', 'loadMessage', 'renderErrorMessage', 'containerBackgroundColor', 'containerBackgroundOpacity', 'containerClassName', 'baseChartMessageImageHAlign', 'baseChartMessageImageVAlign', 'baseChartMessageImageAlpha', 'baseChartMessageImageScale', 'typeNotSupportedMessageImageHAalign', 'typeNotSupportedMessageImageVAlign', 'typeNotSupportedMessageImageAlpha', 'typeNotSupportedMessageImageScale', 'dataLoadErrorMessageImageHAlign', 'dataLoadErrorMessageImageVAlign', 'dataLoadErrorMessageImageAlpha', 'dataLoadErrorMessageImageScale', 'dataLoadStartMessageImageHAlign', 'dataLoadStartMessageImageVAlign', 'dataLoadStartMessageImageAlpha', 'dataLoadStartMessageImageScale', 'dataInvalidMessageImageHAlign', 'dataInvalidMessageImageVAlign', 'dataInvalidMessageImageAlpha', 'dataInvalidMessageImageScale', 'dataEmptyMessageImageHAlign', 'dataEmptyMessageImageVAlign', 'dataEmptyMessageImageAlpha', 'dataEmptyMessageImageScale', 'renderErrorMessageImageHAlign', 'renderErrorMessageImageVAlign', 'renderErrorMessageImageAlpha', 'renderErrorMessageImageScale', 'loadMessageImageHAlign', 'loadMessageImageVAlign', 'loadMessageImageAlpha', 'loadMessageImageScale'];

/* global Ember */
var App = Ember.Application.create();

App.FusionchartsXtComponent = Ember.Component.extend({
    tag: 'div',
    chartObj: null,
    oldOptions: null,
    chartContainer: null,

    init: function init() {
        this._super.apply(this, arguments);
        this.set('oldOptions', this.getCurrentOptions());
    },
    didReceiveAttrs: function didReceiveAttrs() {
        this._super.apply(this, arguments);
        this.detectChanges();
    },
    didInsertElement: function didInsertElement() {
        this._super.apply(this, arguments);
        this.resolveChartContainer();
        this.renderChart();
    },
    willDestroyElement: function willDestroyElement() {
        this._super.apply(this, arguments);
        this.get('chartObj').dispose();
    },
    detectChanges: function detectChanges() {
        var currentOptions = this.getCurrentOptions();
        var oldOptions = this.get('oldOptions');
        var optionsUpdatedNatively = ['width', 'height', 'type', 'dataFormat', 'dataSource', 'events'];

        this.checkAndUpdateChartDimensions(currentOptions, oldOptions);
        this.checkAndUpdateChartType(currentOptions, oldOptions);
        this.checkAndUpdateChartData(currentOptions, oldOptions);
        this.checkAndUpdateEvents(currentOptions, oldOptions);
        this.checkAndUpdateRestOptions(fusonChartsOptions.filter(function (option) {
            return optionsUpdatedNatively.indexOf(option) === -1;
        }), currentOptions, oldOptions);

        this.set('oldOptions', currentOptions);
    },
    checkAndUpdateChartDimensions: function checkAndUpdateChartDimensions(currentOptions, oldOptions) {
        var currWidth = currentOptions.width;
        var currHeight = currentOptions.height;
        var oldWidth = oldOptions.width;
        var oldHeight = oldOptions.height;

        if (String(currWidth) !== String(oldWidth) || String(currHeight) !== String(oldHeight)) {
            if (!utils.isUndefined(currWidth) && !utils.isUndefined(currHeight)) {
                this.get('chartObj').resizeTo(currWidth, currHeight);
            } else {
                if (!utils.isUndefined(currWidth)) {
                    this.get('chartObj').resizeTo({
                        w: currWidth
                    });
                }
                if (!utils.isUndefined(currHeight)) {
                    this.get('chartObj').resizeTo({
                        h: currHeight
                    });
                }
            }
        }
    },
    checkAndUpdateChartType: function checkAndUpdateChartType(currentOptions, oldOptions) {
        var currType = currentOptions.type;
        var oldType = oldOptions.type;

        if (String(currType).toLowerCase() !== String(oldType).toLowerCase()) {
            if (!utils.isUndefined(currType)) {
                this.get('chartObj').chartType(String(currType).toLowerCase());
            }
        }
    },
    checkAndUpdateChartData: function checkAndUpdateChartData(currentOptions, oldOptions) {
        var currDataFormat = currentOptions.dataFormat;
        var currData = currentOptions.dataSource;
        var oldDataFormat = oldOptions.dataFormat;
        var oldData = oldOptions.dataSource;

        if (String(currDataFormat).toLowerCase() !== String(oldDataFormat).toLowerCase()) {
            if (!utils.isUndefined(currDataFormat) && !utils.isUndefined(currData)) {
                this.get('chartObj').setChartData(currData, String(currDataFormat).toLowerCase());
                // If the chart dataFormat is changed then
                // animate the chart to show the changes
                this.get('chartObj').render();
            }
        } else if (!this.isSameChartData(currData, oldData)) {
            if (!utils.isUndefined(currData)) {
                this.get('chartObj').setChartData(currData,
                // When dataFormat is not given, but data is changed,
                // then use 'json' as default dataFormat
                currDataFormat ? String(currDataFormat).toLowerCase() : 'json');
            }
        }
    },
    isSameChartData: function isSameChartData(currData, oldData) {
        if (utils.isObject(currData) && utils.isObject(oldData)) {
            return utils.isSameObjectContent(currData, oldData);
        } else {
            return currData === oldData;
        }
    },
    checkAndUpdateEvents: function checkAndUpdateEvents(currentOptions, oldOptions) {
        var _this = this;

        var currEvents = currentOptions.events;
        var oldEvents = oldOptions.events;
        var temp1 = void 0,
            temp2 = void 0;

        if (this.detectChartEventsChange(currEvents, oldEvents)) {
            if (!utils.isUndefined(currEvents)) {
                temp1 = Object.assign({}, currEvents);
                temp2 = utils.isUndefined(oldEvents) ? {} : Object.assign({}, oldEvents);
                Object.keys(temp2).forEach(function (eventName) {
                    if (temp2[eventName] === temp1[eventName]) {
                        temp1[eventName] = undefined;
                    } else {
                        _this.get('chartObj').removeEventListener(eventName, temp2[eventName]);
                    }
                });
                Object.keys(temp1).forEach(function (eventName) {
                    if (temp1[eventName]) {
                        _this.get('chartObj').addEventListener(eventName, temp1[eventName]);
                    }
                });
            }
        }
    },
    detectChartEventsChange: function detectChartEventsChange(currEvents, oldEvents) {
        if (utils.isObject(currEvents) && utils.isObject(oldEvents)) {
            return !this.isSameChartEvents(currEvents, oldEvents);
        } else {
            return !(currEvents === oldEvents);
        }
    },
    isSameChartEvents: function isSameChartEvents(currEvents, oldEvents) {
        if (Object.keys(currEvents).length !== Object.keys(oldEvents).length) {
            return false;
        }
        var currEventNames = Object.keys(currEvents);
        for (var i = 0; i < currEventNames.length; ++i) {
            var evName = currEventNames[i];
            if (currEvents[evName] !== oldEvents[evName]) {
                return false;
            }
        }
        return true;
    },
    checkAndUpdateRestOptions: function checkAndUpdateRestOptions(restOptions, currentOptions, oldOptions) {
        var _this2 = this;

        var optionsUpdated = false;
        restOptions.forEach(function (optionName) {
            var currValue = currentOptions[optionName];
            var oldValue = oldOptions[optionName];
            if (!_this2.isSameOptionValue(currValue, oldValue)) {
                if (!utils.isUndefined(currValue)) {
                    if (_this2.get('chartObj').options && _this2.get('chartObj').options.hasOwnProperty(optionName)) {
                        _this2.get('chartObj').options[optionName] = currValue;
                        optionsUpdated = true;
                    }
                }
            }
        });
        if (optionsUpdated) {
            this.get('chartObj').render(); // re-render the chart to reflect the changes
        }
    },
    isSameOptionValue: function isSameOptionValue(currValue, oldValue) {
        if (utils.isObject(currValue) && utils.isObject(oldValue)) {
            return utils.isSameObjectContent(currValue, oldValue);
        } else {
            return String(currValue) === String(oldValue);
        }
    },
    resolveChartContainer: function resolveChartContainer() {
        this.set('chartContainer', this.$().get(0));
    },
    renderChart: function renderChart() {
        var currentOptions = this.getCurrentOptions();
        var chartObj = this.get('chartObj');

        currentOptions.renderAt = this.get('chartContainer');

        if (chartObj && chartObj.dispose) {
            chartObj.dispose();
        }
        this.set('chartObj', this.newFusionChartsInstance(currentOptions));
        this.get('chartObj').render();
    },
    getCurrentOptions: function getCurrentOptions() {
        var _this3 = this;

        var chartConfig = this.get('chartConfig') ? this.get("chartConfig") : {};
        var inlineOptions = fusonChartsOptions.reduce(function (options, optionName) {
            options[optionName] = _this3.get(optionName);
            return options;
        }, {});
        Object.assign(inlineOptions, chartConfig);

        if (utils.isObject(inlineOptions['dataSource'])) {
            inlineOptions['dataSource'] = utils.deepCopyOf(inlineOptions['dataSource']);
        }
        if (utils.isObject(inlineOptions['link'])) {
            inlineOptions['link'] = utils.deepCopyOf(inlineOptions['link']);
        }
        if (utils.isObject(inlineOptions['events'])) {
            inlineOptions['events'] = Object.assign({}, inlineOptions['events']);
        }
        return inlineOptions;
    },
    newFusionChartsInstance: function newFusionChartsInstance(chartConfig) {
        var fcCore = this.getFusionChartsCore();
        return new fcCore(chartConfig);
    },
    getFusionChartsCore: function getFusionChartsCore() {
        // The root application has to import
        // the FusionCharts library globally.
        return window.FusionCharts;
    }
});

/***/ })
/******/ ]);