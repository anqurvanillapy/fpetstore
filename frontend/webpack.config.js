const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const bundlePath = [path.join(__dirname, 'src'), path.join(__dirname, 'mock')]
/** @type {import('webpack').Configuration} */
const config = {
    mode: 'development',
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
        filename: 'bundle.js',
        publicPath: './',
        path: path.join(__dirname, 'dist'),
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@': '/src'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: bundlePath,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                include: bundlePath,
                use: 'css-loader'
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                esModule: false
              }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        })
    ]
}

module.exports = config