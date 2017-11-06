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
    actions: {
        onChange: function(type) {
            this.set('type', type);
        }
    }
});