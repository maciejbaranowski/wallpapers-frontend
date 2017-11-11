var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: { path: __dirname, filename: "bundle.js" },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "url-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
