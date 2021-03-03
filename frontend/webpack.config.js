const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const bundlePath = [path.join(__dirname, 'src')]
/** @type {import('webpack').Configuration} */
const config = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
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
        new CleanWebpackPlugin()
    ]
}

module.exports = config