import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const dataSource = {
  data: null,
  caption: {
    text: 'Sales Analysis'
  },
  subcaption: {
    text: 'Grocery & Footwear'
  },
  series: 'Type',
  yAxis: [
    {
      plot: 'Sales Value',
      title: 'Sale Value',
      format: {
        prefix: '$'
      }
    }
  ]
};

const jsonify = res => res.json();
// This is the remote url to fetch the data.
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json'
).then(jsonify);
const schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json'
).then(jsonify);

export default class timeSeriesViewer extends Component {
  @tracked title = 'TimeSeries Example';
  @tracked width = 600;
  @tracked height = 400;
  @tracked type = 'timeseries';
  @tracked dataFormat = null;
  @tracked dataSource = null;

  constructor() {
    super(...arguments);
    this.dataFormat = 'json';
    this.createDataTable();
  }
  
  createDataTable() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionDataTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      dataSource.data = fusionDataTable;
      this.dataSource = dataSource;
    });
  }

  @action
  onClick() {
    const prevDs = { ...this.dataSource };
    prevDs.caption.text = 'Changed';
    this.dataSource = prevDs;
  }
}
