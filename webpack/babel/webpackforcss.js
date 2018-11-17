const path = require('path')
const {getIfUtils} = require('webpack-config-utils')

module.exports = (env) => {
    // 为了把参数信息显示出来, 否则 webpack 只会显示 id
    const {ifProd, ifNotProd} = getIfUtils
    return {
        entry: 'index.js',
        output: {
            path: path.resolve('dist'),
            filename: 'bundle.js',
            // for webpack-dev-server
            publicPath: '/dist/',
        },
        devtool: ifProd('source-map', 'eval'),
        module: {
            use: [
                {test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/},
                {test: /\.css$/, loader: ['css-loader', 'style-loader']},
            ],
        },
    }
}
