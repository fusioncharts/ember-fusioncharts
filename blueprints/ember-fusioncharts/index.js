/* eslint-env node */
module.exports = {
    normalizeEntityName() { },

    afterInstall() {
        return this.addBowerPackageToProject('fusioncharts');
    },
};
