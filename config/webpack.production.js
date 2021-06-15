/*
 * @Author: your name
 * @Date: 2020-02-21 13:50:40
 * @LastEditTime: 2020-12-04 16:36:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /online-education-admin/config/webpack.production.js
 */
const { join, resolve } = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {

    // entry: '../src/index.ts',
    entry: resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'index.js',
        path: join(__dirname, '../dist'),
        library: 'find-antd',
        libraryTarget: 'umd',
    },

    // output: {
    //     filename: "scripts/[name].[contenthash:5].bundule.js"
    // },
    devtool: 'none',
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: [
                    "default",
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ]
            },
            canPrint: true
        }),

        // new BundleAnalyzerPlugin(),
    ]
};