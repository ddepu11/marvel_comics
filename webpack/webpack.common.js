const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: path.resolve(__dirname, "../src/index.js"),

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
};
