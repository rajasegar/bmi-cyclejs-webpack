const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ['@babel/preset-env'],
            "plugins": ['@babel/plugin-syntax-jsx',
              ['@babel/plugin-transform-react-jsx', { 'pragma': 'Snabbdom.createElement'}]]
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    open: true,
    port: 3001
  }
}
