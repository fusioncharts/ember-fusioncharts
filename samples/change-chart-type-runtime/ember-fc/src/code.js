import Component from '@ember/component';

export default Component.extend({
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'json',
    dataSource: {/* see data tab */},
    actions: {
      onChange: function(type) {
          this.set('type', type);
      }
  }
});