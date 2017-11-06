import Component from '@ember/component';

export default Component.extend({
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'xmlurl',
    dataSource: 'data.xml' /* see data tab */
});