var webpack = require('webpack');
module.exports = {
    entry: {
        app: [
            "./app/app.jsx"
        ]
    },
    output: {
        filename: 'public/javascripts/[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader?experimental'],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]

};
