
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: paths.appEntryJs,
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.appMain,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'production'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        parse: {
          // we want uglify-js to parse ecma 8 code. However we want it to output
          // ecma 5 compliant code, to avoid issues with older browsers, this is
          // whey we put `ecma: 5` to the compress and output section
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      }
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron-main'
}
