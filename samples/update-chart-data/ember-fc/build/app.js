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
        updateData() {
            const prevDs = Object.assign({}, this.get('dataSource'));
            prevDs.data[2].label = 'Art Supply Store';
            prevDs.data[2].value = '420000';
            prevDs.data[3].label = 'P.C. Richard & Son';
            prevDs.data[3].value = '210000';
            this.set('dataSource', prevDs);
        }
    }
});