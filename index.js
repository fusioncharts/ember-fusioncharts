/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-fusioncharts',
  description: 'A EmberJS binding for FusionCharts Charting library',
  included: function(app) {
    app.import('bower_components/fusioncharts/fusioncharts.js');
    app.import('bower_components/fusioncharts/fusioncharts.charts.js');
    app.import('bower_components/fusioncharts/themes/fusioncharts.theme.fint.js');
    app.import('bower_components/fusioncharts/themes/fusioncharts.theme.ocean.js');
  }
};
