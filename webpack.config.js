const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: path.resolve (__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'

    }, 
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin( {
            template: "./src/index.pug",
            filename: "index.html"
        }),
        new StylelintPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader",],
          },
          {
            test: /\.pug$/i,
            use: 'pug-loader',
          }
        ],
    },
    devtool: 'source-map',
    devServer: {
        static: {
          directory: path.join(__dirname, "dist"),
        },
        port: 3001,
        hot: true,
        stats: {
            children: false,
            modulesSpace: 0,
        },
    },
}