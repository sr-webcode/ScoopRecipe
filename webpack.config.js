const isDevelopment = process.env.NODE_ENV !== "production",
  path = require("path"),
  miniCSS = require("mini-css-extract-plugin"),
  htmlFile = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  filesCopy = require("copy-webpack-plugin");

//begin config

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: path.resolve(__dirname, "./src/js/app.js"),
  output: {
    filename: "js/app.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 2020
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: miniCSS.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new filesCopy([
      {
        from: path.resolve(__dirname, "./src/assets"),
        to: path.resolve(__dirname, "dist")
      }
    ]),
    new htmlFile({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    new miniCSS({
      filename: "css/style.css"
    }),
    new CleanWebpackPlugin()
  ]
};
