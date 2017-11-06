var App = Ember.Application.create();

App.Router.map(() => {
    // put your routes here
});

App.ChartViewerComponent = Ember.Component.extend({
    width: "100%",
    height: "100%",
    type: 'spline',
    dataFormat: 'jsonurl',
    dataSource: '../../data.json'
});