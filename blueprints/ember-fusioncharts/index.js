/* eslint-env node */
module.exports = {
    normalizeEntityName() { },

    afterInstall() {
        return this.addPackagesToProject([
            { name: 'fusioncharts', target: '^3.13.3-sr.1' }
        ]);
    },
};
