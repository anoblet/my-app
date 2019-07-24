const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlLoader = require("html-loader");
const WebpackLighthousePlugin = require("webpack-lighthouse-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].bundle.js",
    globalObject: "self"
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader"
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
    modules: ["vendor", "node_modules"],
    alias: {
      "lit-element": path.resolve("./node_modules/lit-element")
    }
  },
  devServer: {
    // https: true,
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    historyApiFallback: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          safari10: true
        }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    namedModules: true,
    namedChunks: true
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        sourceMap: true
      }
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "Andrew Noblet",
      short_name: "AN",
      description: "Andrew Noblet",
      background_color: "#000000",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      theme_color: "#000000",
      inject: true
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new CopyWebpackPlugin([
      {
        from: "node_modules/@webcomponents/webcomponentsjs/*",
        to: "js/webcomponentsjs",
        flatten: true
      },
      {
        from: "src/assets/*",
        to: "./",
        flatten: true
      },
      {
        from: "node_modules/material-design-icons/iconfont/*",
        to: "./font",
        flatten: true
      },
      {
        from: "src/workers/**",
        to: "./js/workers",
        flatten: true
      }
    ]),
    new RobotstxtPlugin(),
    new UnusedFilesWebpackPlugin({ patterns: ["src/**/*.*"] }),
    new Visualizer()
  ],
  externals: [
    {
      xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
    }
  ]
};

module.exports = {
  resolve: {
    alias: {
      "lit-element": path.resolve("./node_modules/lit-element")
    }
  }
};
