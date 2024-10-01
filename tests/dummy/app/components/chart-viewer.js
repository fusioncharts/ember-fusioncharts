import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const dataSource = {
    chart: {
        caption: "Harry's SuperMart",
        subCaption: 'Top 5 stores in last month by revenue',
        numberPrefix: '$',
        theme: 'ocean'
    },
    data: [
        {
            label: 'Bakersfield Central',
            value: '880000'
        },
        {
            label: 'Garden Groove harbour',
            value: '730000'
        },
        {
            label: 'Los Angeles Topanga',
            value: '590000'
        },
        {
            label: 'Compton-Rancho Dom',
            value: '520000'
        },
        {
            label: 'Daly City Serramonte',
            value: '330000'
        }
    ]
};

function getRandomNumber() {
    var max = 900000,
        min = 150000;
    return Math.round((max - min) * Math.random() + min);
}

export default class FusionChartsViewers extends Component {
    @tracked title = 'FusionCharts Example';
    @tracked width = 600;
    @tracked height = 400;
    @tracked type = 'column2d';
    @tracked dataFormat = null;
    @tracked dataSource = null;
    @tracked chartConfig = null;
    @tracked events = null;
    @tracked actualValue = '';

    constructor() {
        super(...arguments);
        this.chartConfig = {
            containerBackgroundColor: '#ffffff'
        };
        this.dataFormat = 'json';
        this.dataSource = dataSource;
    }

    @action
    onClick() {
            // this.set('dataFormat', 'xml');
            // const newDataSource = `<chart caption="Top 10 Most Popular Sports in the World"
            // subcaption="Based on number of viewers" yaxisname="Number of Viewers" plotgradientcolor=""
            // bgcolor="FFFFFF" showplotborder="0" divlinecolor="CCCCCC" showvalues="1" showcanvasborder="0"
            // canvasbordercolor="CCCCCC" canvasborderthickness="1" showyaxisvalues="0" showlegend="1"
            // showshadow="0" labelsepchar=": " basefontcolor="000000" labeldisplay="AUTO"
            // numberscalevalue="1000,1000,1000" numberscaleunit="K,M,B"
            // palettecolors="#008ee4,#9b59b6,#6baa01,#e44a00,#f8bd19,#d35400,#bdc3c7,#95a5a6,#34495e,#1abc9c"
            // showborder="0"  rotateValues="0" placevaluesInside="0" valueFontColor="#909090" theme="fint">
            // <set label="Football" value="3500000000" tooltext="Popular in: {br}Europe{br}Africa{br}Asia{br}Americas" />
            // <set label="Cricket" value="4400000000" tooltext="Popular in: {br}India{br}UK{br}Pakistan{br}Australia" />
            // <set label="Field Hockey" value="2200000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Australia" />
            // <set label="Tennis" value="1000000000" color="e44a00" tooltext="Popular in: {br}Europe{br}Americas{br}Asia" />
            // <set label="Volleyball" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Americas{br}Australia" />
            // <set label="Table Tennis" value="900000000" tooltext="Popular in: {br}Asia{br}Europe{br}Africa{br}Americas" />
            // <set label="Baseball" value="500000000" tooltext="Popular in: {br}US{br}Japan{br}Cuba{br}Dominican Republic" />
            // <set label="Golf" value="400000000" tooltext="Popular in: {br}US{br}Canada{br}Europe" />
            // <set label="Basketball" value="400000000" tooltext="Popular in: {br}US{br}Canada" />
            // <set label="American football" value="390000000" tooltext="Popular in:{br}US" />
            // </chart>`;
        const prevDs = { ...this.dataSource };
        prevDs.data[2].value = getRandomNumber();
        prevDs.data[3].value = getRandomNumber();
        prevDs.chart.caption = 'Changed';
        this.dataSource = prevDs;
    }
}
