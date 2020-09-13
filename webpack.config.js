'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'script.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
