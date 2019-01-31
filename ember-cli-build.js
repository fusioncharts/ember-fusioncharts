/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
    let app = new EmberAddon(defaults, {
        // Add options here
    });

    // Import FusionCharts library
    app.import('node_modules/fusioncharts/fusioncharts.js');
    app.import('node_modules/fusioncharts/fusioncharts.charts.js');
    app.import('node_modules/fusioncharts/fusioncharts.timeseries.js');
    app.import('node_modules/fusioncharts/themes/fusioncharts.theme.fint.js');
    app.import('node_modules/fusioncharts/themes/fusioncharts.theme.ocean.js');

    /*
      This build file specifies the options for the dummy test app of this
      addon, located in `/tests/dummy`
      This build file does *not* influence how the addon or the app using it
      behave. You most likely want to be modifying `./index.js` or app's build file
    */

    return app.toTree();
};
