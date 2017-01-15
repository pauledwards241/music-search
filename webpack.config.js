const path = require('path');

const srcPath = path.resolve(__dirname, 'src')
const destPath = path.resolve(__dirname, 'dist')

/* eslint sort-keys: 0 */

module.exports = {
    entry: path.resolve(srcPath, 'index.jsx'),
    output: {
        path: destPath,
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true
    },
    devTool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [srcPath],
                loader: 'babel',
                query: { presets: ['react', 'es2015']}
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};