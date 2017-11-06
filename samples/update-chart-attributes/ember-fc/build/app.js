var App = Ember.Application.create();

App.Router.map(() => {
    // put your routes here
});

const myDataSource = {
    "chart": {
        "caption": "Harry's SuperMart",
        "subCaption": "Top 5 stores in last month by revenue",
        "numberPrefix": "$",
        "theme": "ocean"
    },
    "data": [
        {
            "label": "Bakersfield Central",
            "value": "880000"
        },
        {
            "label": "Garden Groove harbour",
            "value": "730000"
        },
        {
            "label": "Los Angeles Topanga",
            "value": "590000"
        },
        {
            "label": "Compton-Rancho Dom",
            "value": "520000"
        },
        {
            "label": "Daly City Serramonte",
            "value": "330000"
        }
    ]
};

App.ChartViewerComponent = Ember.Component.extend({
    width: "100%",
    height: "85%",
    type: 'column2d',
    dataFormat: 'json',
    dataSource: myDataSource,
    actions: {
        changeBackgroundColor() {
            const prevDs = Object.assign({}, this.get('dataSource'));
            prevDs.chart.bgColor = '#efefef';
            this.set('dataSource', prevDs);
        },
        changeCaptionTextAlignment() {
            const prevDs = Object.assign({}, this.get('dataSource'));
            prevDs.chart.captionAlignment = 'left';
            this.set('dataSource', prevDs);
        }
    }
});
