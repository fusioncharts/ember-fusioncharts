/* eslint-env node */
const path = require('path');

module.exports = {
    entry: './web/index.js',
    output: {
        path: path.resolve(__dirname, 'web', 'dist'),
        filename: "index.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};