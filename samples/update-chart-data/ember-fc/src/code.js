import Component from '@ember/component';

export default Component.extend({
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'json',
    dataSource: {/* see data tab */ },
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