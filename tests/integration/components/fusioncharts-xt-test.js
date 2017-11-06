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

test(`It should handle the chart dimensions change`, function (assert) {
    feedChartConfig(this);
    this.set('width', '600');
    this.set('height', '400');
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    this.set('width', '500');
    this.set('height', '300');
    assert.equal(this.get('width'), '500');
    assert.equal(this.get('height'), '300');

    this.set('width', '600');
    assert.equal(this.get('width'), '600');

    this.set('height', '400');
    assert.equal(this.get('height'), '400');
});

test(`It should handle the chart dimensions change if the width is not specified`, function (assert) {
    feedChartConfig(this);
    this.set('width', undefined);
    this.set('height', undefined);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    this.set('width', '600');
    assert.equal(this.get('width'), '600');
});

test(`It should handle the chart dimensions change if the height is not specified`, function (assert) {
    feedChartConfig(this);
    this.set('width', undefined);
    this.set('height', undefined);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    this.set('height', '400');
    assert.equal(this.get('height'), '400');
});

test(`It should handle the chart type change for the same value`, function (assert) {
    feedChartConfig(this);
    this.set('type', 'column2d');
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    this.set('type', 'column2d');
    assert.equal(this.get('type'), 'column2d');
});

test(`It should handle the chart type change for the different value`, function (assert) {
    feedChartConfig(this);
    this.set('type', 'column2d');
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    this.set('type', 'bar2d');
    assert.equal(this.get('type'), 'bar2d');

    this.set('type', undefined);
    assert.equal(this.get('type'), undefined);

});

test(`It should handle the chart data change for the same value`, function (assert) {
    feedChartConfig(this);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    const newData = Object.assign({}, sampleJSONData);
    this.set('dataSource', newData);
    assert.equal(this.get('dataSource'), newData);
});

test(`It should handle the chart data change for the different value`, function (assert) {
    feedChartConfig(this);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    const newData = sampleXMLData;
    this.set('dataFormat', 'xml');
    this.set('dataSource', newData);
    assert.equal(this.get('dataSource'), newData);
    assert.equal(this.get('dataFormat'), 'xml');

    this.set('dataSource', undefined);
    assert.equal(this.get('dataSource'), undefined);

    this.set('dataFormat', undefined);
    this.set('dataSource', sampleJSONData);
    assert.equal(this.get('dataFormat'), undefined);
    assert.equal(this.get('dataSource'), sampleJSONData);
});

test(`It should handle the chart data format change for the undefined value`, function (assert) {
    feedChartConfig(this);
    this.set('dataFormat', 'json');
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource}}`);
    this.set('dataFormat', undefined);
    assert.equal(this.get('dataFormat'), undefined);
});

test(`It should handle the events option change for the same value`, function (assert) {
    feedChartConfig(this);
    const onDataPlotRollOver = function() {};
    this.set('events', {
        dataPlotRollOver: onDataPlotRollOver
    });
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource events=events}}`);
    const newEvents = {
        dataPlotRollOver: onDataPlotRollOver
    };
    this.set('events', newEvents);
    assert.equal(this.get('events'), newEvents);
});

test(`It should handle the events option change for the different value`, function (assert) {
    feedChartConfig(this);
    let onDataPlotRollOver = function() {};
    this.set('events', {
        dataPlotRollOver: onDataPlotRollOver
    });
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource events=events}}`);
    onDataPlotRollOver = function() {};
    let newEvents = {
        dataPlotRollOver: onDataPlotRollOver
    };
    this.set('events', newEvents);
    assert.equal(this.get('events'), newEvents);

    newEvents = {
        dataPlotRollOver: onDataPlotRollOver,
        dataplotRollOut: function() {}
    };
    this.set('events', newEvents);
    assert.equal(this.get('events'), newEvents);

    this.set('events', undefined);
    assert.equal(this.get('events'), undefined);

    // Events value transition: undefined to object type
    this.set('events', newEvents);
    assert.equal(this.get('events'), newEvents);
});

test(`It should handle the link option change for the same value`, function (assert) {
    feedChartConfig(this);
    this.set('link', {});
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource link=link}}`);
    const newLink = {};
    this.set('link', newLink);
    assert.equal(this.get('link'), newLink);
});

test(`It should handle the link option change for the different value`, function (assert) {
    feedChartConfig(this);
    this.set('link', null);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource link=link}}`);
    const newLink = {};
    this.set('link', newLink);
    assert.equal(this.get('link'), newLink);
});

test(`It should handle the rest options change`, function (assert) {
    feedChartConfig(this);
    this.set('chartConfig', undefined);
    this.render(hbs`{{fusioncharts-xt width=width height=height type=type dataFormat=dataFormat dataSource=dataSource chartConfig=chartConfig}}`);
    this.set('chartConfig', {
        containerBackgroundColor: '#000000'
    });
    assert.equal(this.chartConfig.containerBackgroundColor, '#000000');

    this.set('chartConfig', Object.assign({}, this.chartConfig, {
        containerBackgroundColor: undefined
    }));
    assert.equal(this.chartConfig.containerBackgroundColor, undefined);
});

function feedChartConfig(comp) {
    comp.set('width', 600);
    comp.set('height', 400);
    comp.set('type', 'column2d');
    comp.set('dataFormat', 'json'); 
    comp.set('dataSource', sampleJSONData);
}

const sampleJSONData = {
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

const sampleXMLData = `<chart caption="Top 10 Most Popular Sports in the World" subcaption="Based on number of viewers" yaxisname="Number of Viewers" plotgradientcolor="" bgcolor="FFFFFF" showplotborder="0" divlinecolor="CCCCCC" showvalues="1" showcanvasborder="0" canvasbordercolor="CCCCCC" canvasborderthickness="1" showyaxisvalues="0" showlegend="1" showshadow="0" labelsepchar=": " basefontcolor="000000" labeldisplay="AUTO" numberscalevalue="1000,1000,1000" numberscaleunit="K,M,B" palettecolors="#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c" showborder="0"  rotateValues="0" placevaluesInside="0" valueFontColor="#909090" theme="ocean">
<set label="Football" value="3500000000" tooltext="Popular in: {br}Europe{br}Africa{br}Asia{br}Americas" />
<set label="Cricket" value="3000000000" tooltext="Popular in: {br}India{br}UK{br}Pakistan{br}Australia" />
<set label="Field Hockey" value="2200000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Australia" />
<set label="Tennis" value="1000000000" color="e44a00" tooltext="Popular in: {br}Europe{br}Americas{br}Asia" />
<set label="Volleyball" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Americas{br}Australia" />
<set label="Table Tennis" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Americas" />
<set label="Baseball" value="500000000" tooltext="Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic" />
<set label="Golf" value="400000000" tooltext="Popular in: {br}US{br}Canada{br}Europe" />
<set label="Basketball" value="400000000" tooltext="Popular in: {br}US{br}Canada" />
<set label="American football" value="390000000" tooltext="Popular in:{br}US" />
</chart>`;
