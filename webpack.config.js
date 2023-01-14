const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
        ],
    },
};