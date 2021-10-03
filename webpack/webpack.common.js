const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: path.resolve(__dirname, "../src/index.js"),

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
    clean: true,
  },
};
