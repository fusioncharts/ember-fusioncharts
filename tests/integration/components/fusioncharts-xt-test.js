import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fusioncharts-xt', 'Integration | Component | fusioncharts xt', {
    integration: true
});

test('It should render the chart in a div element', function (assert) {
    feedChartConfig(this);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    assert.equal(this.$('div').prop("tagName").toUpperCase(), 'DIV');
});

test(`It should render a svg element for chart`, function (assert) {
    feedChartConfig(this);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    assert.equal(this.$('svg').prop("tagName").toUpperCase(), 'SVG');
});

function feedChartConfig(comp) {
    comp.set('width', 600);
    comp.set('height', 400);
    comp.set('type', 'column2d');
    comp.set('dataFormat', 'json');
    comp.set('dataSource', sampleData);
}

const sampleData = {
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
