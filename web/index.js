const utils = (function () {
    function isObject(value) {
        return value !== null && typeof value === 'object';
    }

    function isCallable(value) {
        return typeof value === 'function';
    }

    function isSameObjectContent(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) { return false; }
        const keys = Object.keys(obj1);

        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
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
        const UNDEFINED = void (0);
        return value === UNDEFINED;
    }

    function deepCopyOf(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    return { isObject, isCallable, isSameObjectContent, isUndefined, deepCopyOf };
})();

const fusonChartsOptions = [
    'type',
    'id',
    'width',
    'height',
    'dataFormat',
    'dataSource',
    'events',
    'link',
    'showDataLoadingMessage',
    'showChartLoadingMessage',
    'baseChartMessageFont',
    'baseChartMessageFontSize',
    'baseChartMessageColor',
    'dataLoadStartMessage',
    'dataLoadErrorMessage',
    'dataInvalidMessage',
    'dataEmptyMessage',
    'typeNotSupportedMessage',
    'loadMessage',
    'renderErrorMessage',
    'containerBackgroundColor',
    'containerBackgroundOpacity',
    'containerClassName',
    'baseChartMessageImageHAlign',
    'baseChartMessageImageVAlign',
    'baseChartMessageImageAlpha',
    'baseChartMessageImageScale',
    'typeNotSupportedMessageImageHAalign',
    'typeNotSupportedMessageImageVAlign',
    'typeNotSupportedMessageImageAlpha',
    'typeNotSupportedMessageImageScale',
    'dataLoadErrorMessageImageHAlign',
    'dataLoadErrorMessageImageVAlign',
    'dataLoadErrorMessageImageAlpha',
    'dataLoadErrorMessageImageScale',
    'dataLoadStartMessageImageHAlign',
    'dataLoadStartMessageImageVAlign',
    'dataLoadStartMessageImageAlpha',
    'dataLoadStartMessageImageScale',
    'dataInvalidMessageImageHAlign',
    'dataInvalidMessageImageVAlign',
    'dataInvalidMessageImageAlpha',
    'dataInvalidMessageImageScale',
    'dataEmptyMessageImageHAlign',
    'dataEmptyMessageImageVAlign',
    'dataEmptyMessageImageAlpha',
    'dataEmptyMessageImageScale',
    'renderErrorMessageImageHAlign',
    'renderErrorMessageImageVAlign',
    'renderErrorMessageImageAlpha',
    'renderErrorMessageImageScale',
    'loadMessageImageHAlign',
    'loadMessageImageVAlign',
    'loadMessageImageAlpha',
    'loadMessageImageScale'
];

/* global Ember */
window.FusionchartsXtComponent = Ember.Component.extend({
    tag: 'div',
    chartObj: null,
    oldOptions: null,
    chartContainer: null,

    init() {
        this._super(...arguments);
        this.set('oldOptions', this.getCurrentOptions());
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.detectChanges();
    },

    didInsertElement() {
        this._super(...arguments);
        this.resolveChartContainer();
        this.renderChart();
    },

    willDestroyElement() {
        this._super(...arguments);
        this.get('chartObj').dispose();
    },

    detectChanges() {
        const currentOptions = this.getCurrentOptions();
        const oldOptions = this.get('oldOptions');
        const optionsUpdatedNatively = [
            'width',
            'height',
            'type',
            'dataFormat',
            'dataSource',
            'events'
        ];

        this.checkAndUpdateChartDimensions(currentOptions, oldOptions);
        this.checkAndUpdateChartType(currentOptions, oldOptions);
        this.checkAndUpdateChartData(currentOptions, oldOptions);
        this.checkAndUpdateEvents(currentOptions, oldOptions);
        this.checkAndUpdateRestOptions(
            fusonChartsOptions.filter(option => optionsUpdatedNatively.indexOf(option) === -1),
            currentOptions,
            oldOptions
        );

        this.set('oldOptions', currentOptions);
    },

    checkAndUpdateChartDimensions(currentOptions, oldOptions) {
        const currWidth = currentOptions.width;
        const currHeight = currentOptions.height;
        const oldWidth = oldOptions.width;
        const oldHeight = oldOptions.height;

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

    checkAndUpdateChartType(currentOptions, oldOptions) {
        const currType = currentOptions.type;
        const oldType = oldOptions.type;

        if (String(currType).toLowerCase() !== String(oldType).toLowerCase()) {
            if (!utils.isUndefined(currType)) {
                this.get('chartObj').chartType(String(currType).toLowerCase());
            }
        }
    },

    checkAndUpdateChartData(currentOptions, oldOptions) {
        const currDataFormat = currentOptions.dataFormat;
        const currData = currentOptions.dataSource;
        const oldDataFormat = oldOptions.dataFormat;
        const oldData = oldOptions.dataSource;

        if (String(currDataFormat).toLowerCase() !== String(oldDataFormat).toLowerCase()) {
            if (!utils.isUndefined(currDataFormat) && !utils.isUndefined(currData)) {
                this.get('chartObj').setChartData(currData, String(currDataFormat).toLowerCase());
                // If the chart dataFormat is changed then
                // animate the chart to show the changes
                this.get('chartObj').render();
            }
        } else if (!this.isSameChartData(currData, oldData)) {
            if (!utils.isUndefined(currData)) {
                this.get('chartObj').setChartData(
                    currData,
                    // When dataFormat is not given, but data is changed,
                    // then use 'json' as default dataFormat
                    currDataFormat ? String(currDataFormat).toLowerCase() : 'json'
                );
            }
        }
    },

    isSameChartData(currData, oldData) {
        if (utils.isObject(currData) && utils.isObject(oldData)) {
            return utils.isSameObjectContent(currData, oldData);
        } else {
            return currData === oldData;
        }
    },

    checkAndUpdateEvents(currentOptions, oldOptions) {
        const currEvents = currentOptions.events;
        const oldEvents = oldOptions.events;
        let temp1, temp2;

        if (this.detectChartEventsChange(currEvents, oldEvents)) {
            if (!utils.isUndefined(currEvents)) {
                temp1 = Object.assign({}, currEvents);
                temp2 = utils.isUndefined(oldEvents) ? {} : Object.assign({}, oldEvents);
                Object.keys(temp2).forEach((eventName) => {
                    if (temp2[eventName] === temp1[eventName]) {
                        temp1[eventName] = undefined;
                    } else {
                        this.get('chartObj').removeEventListener(eventName, temp2[eventName]);
                    }
                });
                Object.keys(temp1).forEach((eventName) => {
                    if (temp1[eventName]) {
                        this.get('chartObj').addEventListener(eventName, temp1[eventName]);
                    }
                });
            }
        }
    },

    detectChartEventsChange(currEvents, oldEvents) {
        if (utils.isObject(currEvents) && utils.isObject(oldEvents)) {
            return !(this.isSameChartEvents(currEvents, oldEvents));
        } else {
            return !(currEvents === oldEvents);
        }
    },

    isSameChartEvents(currEvents, oldEvents) {
        if (Object.keys(currEvents).length !== Object.keys(oldEvents).length) { return false; }
        const currEventNames = Object.keys(currEvents);
        for (let i = 0; i < currEventNames.length; ++i) {
            const evName = currEventNames[i];
            if (currEvents[evName] !== oldEvents[evName]) {
                return false;
            }
        }
        return true;
    },

    checkAndUpdateRestOptions(restOptions, currentOptions, oldOptions) {
        let optionsUpdated = false;
        restOptions.forEach((optionName) => {
            const currValue = currentOptions[optionName];
            const oldValue = oldOptions[optionName];
            if (!this.isSameOptionValue(currValue, oldValue)) {
                if (!utils.isUndefined(currValue)) {
                    if (this.get('chartObj').options && this.get('chartObj').options.hasOwnProperty(optionName)) {
                        this.get('chartObj').options[optionName] = currValue;
                        optionsUpdated = true;
                    }
                }
            }
        });
        if (optionsUpdated) {
            this.get('chartObj').render(); // re-render the chart to reflect the changes
        }
    },

    isSameOptionValue(currValue, oldValue) {
        if (utils.isObject(currValue) && utils.isObject(oldValue)) {
            return utils.isSameObjectContent(currValue, oldValue);
        } else {
            return String(currValue) === String(oldValue);
        }
    },

    resolveChartContainer() {
        this.set('chartContainer', this.$().get(0));
    },

    renderChart() {
        const currentOptions = this.getCurrentOptions();
        const chartObj = this.get('chartObj');

        currentOptions.renderAt = this.get('chartContainer');

        if (chartObj && chartObj.dispose) { chartObj.dispose(); }
        this.set('chartObj', this.newFusionChartsInstance(currentOptions));
        this.get('chartObj').render();
    },

    getCurrentOptions() {
        const chartConfig = this.get('chartConfig') ? this.get("chartConfig") : {};
        const inlineOptions = fusonChartsOptions.reduce((options, optionName) => {
            options[optionName] = this.get(optionName);
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

    newFusionChartsInstance(chartConfig) {
        const fcCore = this.getFusionChartsCore();
        return new fcCore(chartConfig);
    },

    getFusionChartsCore() {
        // The root application has to import
        // the FusionCharts library globally.
        return window.FusionCharts;
    }
});