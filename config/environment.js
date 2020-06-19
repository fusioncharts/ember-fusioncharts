/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    'ember-fusioncharts': {
      libraries: ['charts'],
      themes: ['fusion']
    }
  };
};
