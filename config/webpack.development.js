/*
 * @Author: your name
 * @Date: 2020-02-21 13:49:54
 * @LastEditTime: 2020-12-04 13:54:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /online-education-admin/config/webpack.development.js
 */
const { join, resolve } = require('path');
const Jarvis = require('webpack-jarvis');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
    devtool: 'inline-cheap-source-map',
    entry: join(__dirname, '../example/src/index.tsx'),
    output: {
        path: join(__dirname, '../example/dist'),
        filename: "index.js",
        library: 'Find-antd',
        libraryTarget: 'umd',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: join(__dirname, "../dist"),
        port: 8008,
        proxy: {
            "/api": "http://localhost:8008"
        },
        hot: true,
        quiet: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, '../example/src/index.html'),
            filename: 'index.html',
            title: "Find-线上教育管理系统",
            // favicon: resolve(__dirname, "../public/favicon.ico"),
        }),
        // new BundleAnalyzerPlugin(),
        // new Jarvis({
        //   port: 1337 // optional: set a port
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBuildNotifierPlugin({
            title: "🎹Find—在线教育后台管理",
            // logo: resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ["You application is running here http://localhost:8888"],
                notes: ["开发环境的Mock数据请务必与服务器保持一致"]
            },
            clearConsole: true,
            onErrors: (severity, errors) => {
                // if (severity !== "error") {
                //   return; everity + ": " + error.name,
                // }
                // const error = errors[0];
                new WebpackBuildNotifierPlugin({
                    title: "🎹Find—在线教育后台管理",
                    // logo: resolve("../favicon.png"),
                    suppressSuccess: true
                });
            }
        })
    ]
}