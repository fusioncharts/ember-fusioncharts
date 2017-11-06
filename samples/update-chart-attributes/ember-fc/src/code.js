import Component from '@ember/component';

export default Component.extend({
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'json',
    dataSource: {/* see data tab */},
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