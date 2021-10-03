const path = require("path");

module.exports = {
  mode: "development",

  devtool: "eval-cheap-module-source-map",

  devServer: {
    static: path.resolve(__dirname, "../build"),
    port: 3000,
    hot: true,
  },
};
