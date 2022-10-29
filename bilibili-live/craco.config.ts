const path = require("path")
const WebpackBar = require("webpackbar")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const {whenDev, whenProd} = require("@craco/craco")
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isDev = process.env.NODE_ENV === "development"

// 开发环境用到的插件
const whenDevPlugin = whenDev(() => ([
  // 循环依赖检查
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    include: /src/,
    failOnError: true,
    allowAsyncCycles: false,
    cwd: process.cwd()
  })
]), [])

// 生产环境需要用到的插件
const whenProdPlugin = whenProd(() => ([
  new BundleAnalyzerPlugin(),
  new CompressionWebpackPlugin()
]), [])

module.exports = {
  reactScriptsVersion: "react-scripts",
  webpack: {
    configure: {
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
      },
      optimization: {
        minimizer: [new UglifyJsPlugin({
          test: /.(js|jsx|ts|tsx)+$/i,  // 测试匹配文件,
          cache: false,   // 是否启用文件缓存
          parallel: true,  // 使用多进程并行运行来提高构建速度
          uglifyOptions: {
            warning: false,
            compress: {
              drop_debugger: true, // 清除debugger
              drop_console: false, // 是否清除所有console
              pure_funcs: ["console.log", "console.info"],    // 需要清除的console
            },
          },
        })]
      }
    },
    alias: {
      "@": path.join(__dirname, "src")
    },
    plugins: {
      add: [
        new WebpackBar({
          name: "webpack开始构建......",
          color: "#18d7bb",
          profile: true
        }),
        ...isDev ? whenDevPlugin : whenProdPlugin
      ]
    }
  },
}

export {}
