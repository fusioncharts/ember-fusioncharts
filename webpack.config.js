/* eslint-env node */
const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './web/index.js',
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: "index.min.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],
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