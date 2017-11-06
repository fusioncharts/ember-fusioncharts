var App = Ember.Application.create();

App.Router.map(() => {
    // put your routes here
});

App.ChartViewerComponent = Ember.Component.extend({
    width: "100%",
    height: "85%",
    type: 'column2d',
    dataFormat: 'jsonurl',
    dataSource: '../../data.json',
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