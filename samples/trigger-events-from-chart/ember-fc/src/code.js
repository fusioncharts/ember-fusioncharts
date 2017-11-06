import Component from '@ember/component';

export default Component.extend({
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'json',
    dataSource: {/* see data tab */ },
    events: null,
    actualValue: '',

    init() {
        this._super(...arguments);
        const self = this;
        this.set('events', {
            dataplotRollOver: function dataplotRollOver(eventObj, dataObj) {
                self.set('actualValue', dataObj.dataValue);
            }
        });
    }
});