import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fusonChartsOptions } from '../utils/options';
import * as utils from '../utils/utils';

export default class FusionChartXt extends Component {
  @tracked chartObj = null;
  @tracked oldOptions = null;
  @tracked chartContainer = null;

  constructor() {
    super(...arguments);
    this.oldOptions = this.getCurrentOptions();
  }

  @action
  onDidInsert(element) {
    set(this, 'chartContainer', element);
    this.renderChart();
  }

  @action
  onDidUpdate() {
    this.detectChanges();
  }

  @action
  onWillDestroy() {
    this.chartObj.dispose();
  }

  @action
  detectChanges() {
    const currentOptions = this.getCurrentOptions();
    const oldOptions = this.oldOptions;
    const optionsUpdatedNatively = [
      'width',
      'height',
      'type',
      'dataFormat',
      'dataSource',
      'events',
    ];

    this.checkAndUpdateChartDimensions(currentOptions, oldOptions);
    this.checkAndUpdateChartType(currentOptions, oldOptions);
    this.checkAndUpdateChartData(currentOptions, oldOptions);
    this.checkAndUpdateEvents(currentOptions, oldOptions);
    this.checkAndUpdateRestOptions(
      fusonChartsOptions.filter(
        (option) => optionsUpdatedNatively.indexOf(option) === -1,
      ),
      currentOptions,
      oldOptions,
    );

    this.oldOptions = currentOptions;
  }

  @action
  checkAndUpdateChartDimensions(currentOptions, oldOptions) {
    const currWidth = currentOptions.width;
    const currHeight = currentOptions.height;
    const oldWidth = oldOptions.width;
    const oldHeight = oldOptions.height;

    const chartObj = this.chartObj;

    if (
      String(currWidth) !== String(oldWidth) ||
      String(currHeight) !== String(oldHeight)
    ) {
      if (!utils.isUndefined(currWidth) && !utils.isUndefined(currHeight)) {
        chartObj.resizeTo(currWidth, currHeight);
      } else {
        if (!utils.isUndefined(currWidth)) {
          chartObj.resizeTo({ w: currWidth });
        }
        if (!utils.isUndefined(currHeight)) {
          chartObj.resizeTo({ h: currHeight });
        }
      }
    }
  }

  @action
  checkAndUpdateChartType(currentOptions, oldOptions) {
    const currType = currentOptions.type;
    const oldType = oldOptions.type;

    if (String(currType).toLowerCase() !== String(oldType).toLowerCase()) {
      if (!utils.isUndefined(currType)) {
        this.chartObj.chartType(String(currType).toLowerCase());
      }
    }
  }

  @action
  checkAndUpdateChartData(currentOptions, oldOptions) {
    const currDataFormat = currentOptions.dataFormat;
    const currData = currentOptions.dataSource;
    const oldDataFormat = oldOptions.dataFormat;
    const oldData = oldOptions.dataSource;

    const chartObj = this.chartObj;

    if (
      String(currDataFormat).toLowerCase() !==
      String(oldDataFormat).toLowerCase()
    ) {
      if (!utils.isUndefined(currDataFormat) && !utils.isUndefined(currData)) {
        chartObj.setChartData(currData, String(currDataFormat).toLowerCase());
        // If the chart dataFormat is changed then
        // animate the chart to show the changes
        chartObj.render();
      }
    } else if (!this.isSameChartData(currData, oldData)) {
      if (!utils.isUndefined(currData)) {
        chartObj.setChartData(
          currData,
          // When dataFormat is not given, but data is changed,
          // then use 'json' as default dataFormat
          currDataFormat ? String(currDataFormat).toLowerCase() : 'json',
        );
      }
    }
  }

  isSameChartData(currData, oldData) {
    // if (utils.isObject(currData) && utils.isObject(oldData)) {
    //     return utils.isSameObjectContent(currData, oldData);
    // } else {
    //     return currData === oldData;
    // }
    if (
      utils.checkIfDataTableExists(currData) &&
      !utils.checkIfDataTableExists(oldData)
    ) {
      return false;
    }
    if (
      !utils.checkIfDataTableExists(currData) &&
      utils.checkIfDataTableExists(oldData)
    ) {
      return false;
    }
    if (
      utils.checkIfDataTableExists(currData) &&
      utils.checkIfDataTableExists(oldData) &&
      currData.data !== oldData.data
    ) {
      return false;
    }
    const oldDataStringified = JSON.stringify(
      utils.cloneDataSource(oldData, 'diff'),
    );
    const currentDataStringified = JSON.stringify(
      utils.cloneDataSource(currData, 'diff'),
    );
    return oldDataStringified === currentDataStringified;
  }

  @action
  checkAndUpdateEvents(currentOptions, oldOptions) {
    const currEvents = currentOptions.events;
    const oldEvents = oldOptions.events;
    let temp1, temp2;

    const chartObj = this.chartObj;

    if (this.detectChartEventsChange(currEvents, oldEvents)) {
      if (!utils.isUndefined(currEvents)) {
        temp1 = Object.assign({}, currEvents);
        temp2 = utils.isUndefined(oldEvents)
          ? {}
          : Object.assign({}, oldEvents);
        Object.keys(temp2).forEach((eventName) => {
          if (temp2[eventName] === temp1[eventName]) {
            temp1[eventName] = undefined;
          } else {
            chartObj.removeEventListener(eventName, temp2[eventName]);
          }
        });
        Object.keys(temp1).forEach((eventName) => {
          if (temp1[eventName]) {
            chartObj.addEventListener(eventName, temp1[eventName]);
          }
        });
      }
    }
  }

  @action
  detectChartEventsChange(currEvents, oldEvents) {
    if (utils.isObject(currEvents) && utils.isObject(oldEvents)) {
      return !this.isSameChartEvents(currEvents, oldEvents);
    } else {
      return !(currEvents === oldEvents);
    }
  }

  isSameChartEvents(currEvents, oldEvents) {
    if (Object.keys(currEvents).length !== Object.keys(oldEvents).length) {
      return false;
    }
    const currEventNames = Object.keys(currEvents);
    for (let i = 0; i < currEventNames.length; ++i) {
      const evName = currEventNames[i];
      if (currEvents[evName] !== oldEvents[evName]) {
        return false;
      }
    }
    return true;
  }

  @action
  checkAndUpdateRestOptions(restOptions, currentOptions, oldOptions) {
    let optionsUpdated = false;
    const chartObj = this.chartObj;

    restOptions.forEach((optionName) => {
      const currValue = currentOptions[optionName];
      const oldValue = oldOptions[optionName];
      if (!this.isSameOptionValue(currValue, oldValue)) {
        if (!utils.isUndefined(currValue)) {
          if (
            chartObj.options &&
            Object.prototype.hasOwnProperty.call(chartObj.options, optionName)
          ) {
            chartObj.options[optionName] = currValue;
            optionsUpdated = true;
          }
        }
      }
    });
    if (optionsUpdated) {
      chartObj.render(); // re-render the chart to reflect the changes
    }
  }

  isSameOptionValue(currValue, oldValue) {
    if (utils.isObject(currValue) && utils.isObject(oldValue)) {
      return utils.isSameObjectContent(currValue, oldValue);
    } else {
      return String(currValue) === String(oldValue);
    }
  }

  @action
  renderChart() {
    const currentOptions = this.getCurrentOptions();
    currentOptions.renderAt = this.chartContainer;

    const chartObj = this.newFusionChartsInstance(currentOptions);
    this.chartObj = chartObj;

    chartObj.render();
  }

  @action
  getCurrentOptions() {
    const chartConfig = this.chartConfig ? this.chartConfig : {};
    const inlineOptions = fusonChartsOptions.reduce((options, optionName) => {
      options[optionName] = get(this.args, optionName) || get(this, optionName);
      return options;
    }, {});
    Object.assign(inlineOptions, chartConfig);

    if (
      !utils.checkIfDataTableExists(inlineOptions['dataSource']) &&
      utils.isObject(inlineOptions['dataSource'])
    ) {
      inlineOptions['dataSource'] = utils.deepCopyOf(
        inlineOptions['dataSource'],
      );
    } else if (
      utils.isObject(inlineOptions['dataSource']) &&
      utils.checkIfDataTableExists(inlineOptions['dataSource'])
    ) {
      inlineOptions['dataSource'] = utils.cloneDataSource(
        inlineOptions['dataSource'],
        'clone',
      );
    }
    if (utils.isObject(inlineOptions['link'])) {
      inlineOptions['link'] = utils.deepCopyOf(inlineOptions['link']);
    }
    if (utils.isObject(inlineOptions['events'])) {
      inlineOptions['events'] = Object.assign({}, inlineOptions['events']);
    }
    return inlineOptions;
  }

  @action
  newFusionChartsInstance(chartConfig) {
    const fcCore = this.getFusionChartsCore();
    return new fcCore(chartConfig);
  }

  getFusionChartsCore() {
    // The root application has to import
    // the FusionCharts library globally.
    return window.FusionCharts;
  }
}
