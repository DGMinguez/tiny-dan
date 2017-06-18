/// <binding ProjectOpened='Watch - Development' /> 

'use strict';

var path = require('path');
var webpack = require('webpack');

var AssetsWebpackPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

var isProd = (process.env.NODE_ENV === 'production');

module.exports = function webpackConfig() {

    var config = {};

    // clarify output filenames
    var outputFileName = 'dist/[name].js';
    var outputCss = 'dist/site.css';
    if (isProd) {
        outputFileName = 'dist/[name].[hash].js';
        outputCss = 'dist/site.[hash].css'
    }

    if (!isProd) {
        config.devServer = {
            contentBase: '.',
            host: 'localhost',
            port: 9000
        };
        config.devtool = 'eval-source-map';
    }

    config.entry = {
        'polyfills': './scripts/polyfills.ts',
        'vendor': './scripts/vendor.ts',
        'app': './scripts/app/main.ts'
    };

    config.output = {
        path: root('./wwwroot'),
        filename: outputFileName
    };

    config.resolve = {
        extensions: ['.ts', '.js', '.css', '.html']
    };

    config.module = {
        loaders: [
          {
              test: /\.ts$/,
              loaders: ['ts-loader', 'angular2-template-loader']
          },
          {
              test: /\.html$/,
              loader: 'html-loader?-minimize'
          },
          {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
              loader: 'file?name=/dist/assets/[name].[ext]'
          },
          {
              test: /\.css$/,
              exclude: root('src', 'app'),
              loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
          },
          {
              test: /\.css$/,
              include: root('src', 'app'),
              loader: 'raw'
          }
        ],
        exprContextCritical: false
    };

    config.plugins = [
        new WebpackNotifierPlugin(),

        new CleanWebpackPlugin(['./wwwroot/dist']),

        new AssetsWebpackPlugin({
            filename: 'webpack.assets.json',
            path: './wwwroot/data/',
            prettyPrint: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new ExtractTextPlugin(outputCss)
    ];


    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                compress: {
                    screw_ie8: true,
                    warnings: false
                },
                mangle: {
                    screw_i8: true,
                    keep_fnames: true
                },
                output: {
                    comments: false
                }
            })
        );
    }

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
