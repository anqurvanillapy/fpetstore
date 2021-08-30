const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

const bundlePath = [path.join(__dirname, 'src'), path.join(__dirname, 'mock')]
/** @type {import('webpack').Configuration} */
const config = {
    mode: 'none',
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            '@': '/src'
        }
    },
    devServer: {
        port: 8080,
        hot: true
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
        new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
        })
    ]
}

module.exports = config