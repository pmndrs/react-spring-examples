const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
// const CheckerPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'))

const createAlias = (name, fallback) => (fs.existsSync(name) ? name : fallback)

const buildAliases = () => {
  const alias = {
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    'react-spring$': '@react-spring/web',
    shared: '@react-spring/shared',
  }
  if (fs.existsSync('../package.json')) {
    const monorepo = readJson('../package.json')
    if (monorepo.name == '@react-spring/lerna') {
      // Get every package in the monorepo.
      const dirs = [].concat(
        ...['../packages', '../targets'].map(dir =>
          fs
            .readdirSync(dir)
            .filter(p => p[0] !== '.' && p !== 'react-spring')
            .map(p => path.join(dir, p))
        )
      )
      // Redirect "@react-spring/web" to "../targets/web" for example
      dirs.forEach(dir => {
        const pkg = readJson(path.join(dir, 'package.json'))
        alias[pkg.name] = createAlias(path.resolve(dir), pkg.name)
      })
      // Ensure "shared/globals" can be resolved.
      alias['@react-spring/shared'] = createAlias(
        path.resolve('../packages/shared/src'),
        '@react-spring/shared'
      )
    }
  }
  return alias
}

module.exports = mode => {
  return {
    mode,
    entry: 'index.js',
    output: {
      filename: 'bundle.[contenthash].js',
      path: path.resolve('./dist'),
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.tsx?$/,
          use: {
            // loader: 'ts-loader',
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    loose: true,
                    useBuiltIns: false,
                    targets: { browsers: 'last 2 Chrome versions' },
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/proposal-class-properties', { loose: true }],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve('./'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: buildAliases(),
    },
    plugins: [
      new CheckerPlugin(),
      new HtmlWebpackPlugin({ template: 'template.html' }),
    ],
    devServer: {
      hot: false,
      contentBase: path.resolve('./'),
      stats: 'errors-only',
    },
    devtool: 'inline-source-map',
    performance: { hints: false },
  }
}
