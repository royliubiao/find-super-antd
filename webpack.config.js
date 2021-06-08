const webpack = require('webpack');
const merge = require('webpack-merge');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { join, resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = _mode === "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

console.log('_mergeConfig', _mergeConfig)

//基本配置
const webpackBaseConfig = {
    //Module
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx|ts|tsx)$/,
            //     include: [resolve("src")],
            //     exclude: /node_modules/,
            //     loader: "babel-loader"
            //     // loader:"awesome-typescript-loader"
            // },

            // ts-loader 用于加载解析 ts 文件
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            // 用于加载解析 less 文件
            //antd定制主题
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS,
                        options: {
                            modifyVars: {
                                // 'primary-color': '#4bc88e',
                                // 'link-color': '#1DA57A',
                                // 'border-radius-base': '5px',
                                //or
                                'hack': `true; @import "${resolve('./styles/theme.less')}";`
                                // 'hack': "./src/styles/antd.less", // Override with less file
                            },
                            javascriptEnabled: true,
                        },
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    _modeflag ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf|ico|pdf)$/,
                use: [
                    {
                        // loader: 'file-loader',
                        loader: "url-loader",
                        options: {
                            // 小于 10kB(10240字节）的内联文件
                            limit: 1 * 1024,
                            name: _modeflag
                                ? "images/[name].[hash:5].[ext]"
                                : "images/[name].[ext]"
                        }
                    }
                ]
            }

        ],
    },
    optimization: {
        minimize: _modeflag ? true : false,
        runtimeChunk: {
            name: "runtime"
        },
    },
    //别名
    resolve: {
        alias: {
            "@/assets": resolve(__dirname, 'src/assets'),
            "@/components": resolve(__dirname, "src/components"),
            "@/models": resolve(__dirname, "src/models"),
            "@/pages": resolve(__dirname, "src/pages"),
            "@/utils": resolve(__dirname, "src/utils"),
            "@/styles": resolve(__dirname, "src/styles"),
            "@/config": resolve(__dirname, "src/config"),
            "@/http": resolve(__dirname, "src/http"),
            "@/api": resolve(__dirname, "src/api"),
            "@/types": resolve(__dirname, "src/types"),
        },
        modules: ["node_modules", resolve("src")],
        extensions: [".js", ".ts", ".tsx", "jsx"]
    },
    //plugin
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag
                ? "styles/[name].[contenthash:5].css"
                : "styles/[name].css",
            chunkFilename: _modeflag
                ? "styles/[name].[contenthash:5].css"
                : "styles/[name].css"
        }),

    ],
    watchOptions: {
        ignored: /dist/,
    },


}

module.exports = merge(_mergeConfig, webpackBaseConfig);

