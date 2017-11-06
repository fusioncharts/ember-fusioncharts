import Component from '@ember/component';

export default Component.extend({
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'jsonurl',
    dataSource: 'data.json' /* see data tab */
});