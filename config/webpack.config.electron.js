
const paths = require ('./paths');

const env = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: paths.appEntryJs,
  output: {
    path: paths.publicUrl,
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: paths.appMain,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              // transpileOnly: true,
            },
          },
        ],
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron-main'
}
