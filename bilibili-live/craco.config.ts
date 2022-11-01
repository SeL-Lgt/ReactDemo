const path = require('path');
const WebpackBar = require('webpackbar');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { whenDev, whenProd } = require('@craco/craco');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pxToViewport = require('postcss-px-to-viewport-8-plugin');
const CracoLessPlugin = require('craco-less');

const isDev = process.env.NODE_ENV === 'development';

// 开发环境用到的插件
const whenDevPlugin = whenDev(
  () => [
    // 循环依赖检查
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
  [],
);

// 生产环境需要用到的插件
const whenProdPlugin = whenProd(
  () => [new BundleAnalyzerPlugin(), new CompressionWebpackPlugin()],
  [],
);

module.exports = {
  reactScriptsVersion: 'react-scripts',
  webpack: {
    configure: {
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
      },
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            test: /.(js|jsx|ts|tsx)+$/i, // 测试匹配文件,
            cache: false, // 是否启用文件缓存
            parallel: true, // 使用多进程并行运行来提高构建速度
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_debugger: true, // 清除debugger
                drop_console: false, // 是否清除所有console
                pure_funcs: ['console.log', 'console.info'], // 需要清除的console
              },
            },
          }),
        ],
      },
    },
    alias: {
      '@': path.join(__dirname, 'src'),
      '@style': path.join(__dirname, 'src/assets/style'),
    },
    plugins: {
      add: [
        new WebpackBar({
          name: 'webpack开始构建......',
          color: '#18d7bb',
          profile: true,
        }),
        ...(isDev ? whenDevPlugin : whenProdPlugin),
      ],
    },
  },
  plugins: [
    // 配置 less
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // 自定义主题（如果有需要，单独文件定义更好一些）
              '@Theme-color': '#FB7299',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            pxToViewport({
              unitToConvert: 'px', // 要转化的单位
              viewportWidth: 375, // UI设计稿的宽度
              unitPrecision: 6, // 转换后的精度，即小数点位数
              propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
              viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
              fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
              selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
              minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
              mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
              replace: true, // 是否转换后直接更换属性值
              exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
              landscape: false, // 是否处理横屏情况
            }),
          ],
        },
      },
    },
  },
};

export {};
