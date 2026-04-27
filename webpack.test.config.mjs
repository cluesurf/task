import path from 'path'
import webpack from 'webpack'
// const HtmlWebpackPlugin = require('html-webpack-plugin')

export default {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'web',
  watchOptions: {
    poll: true,
    ignored: [
      'node_modules',
      '**/node_modules',
      'code/**/node.ts',
      'code/cli/**/*.ts',
      '**/host',
    ],
  },
  entry: {
    'test.browser': './test/browser/page.entry.ts',
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(`./host`),
    globalObject: 'window',
    library: {
      name: 'task',
      type: 'umd',
    },
  },
  resolve: {
    alias: {
      '~/code': path.resolve('./code'),
    },
    extensions: ['', '.ts', '.js'],
    fallback: {
      path: 'path-browserify',
      process: path.resolve('process/browser'),
      stream: 'stream-browserify',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.standalone.json',
              transpileOnly: true,
              onlyCompileBundledFiles: true,
              compilerOptions: {
                noEmit: false,
                rootDir: path.resolve('.'),
                outDir: path.resolve('./host'),
                declaration: false,
                ignoreDeprecations: '6.0',
              },
              ignoreDiagnostics: [5011, 5101, 5107],
            },
          },
        ],
        exclude: /node_modules|host/,
      },
    ],
  },
}
