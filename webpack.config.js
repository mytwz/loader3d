/*
 * @Author: Summer
 * @LastEditors: Summer
 * @Description: 
 * @Date: 2021-07-15 09:20:24 +0800
 * @LastEditTime: 2021-07-15 10:54:11 +0800
 * @FilePath: \3dloader\webpack.config.js
 */
// 引入包
const path = require("path")
// 引入build时删除的dist的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")
// webpack的锁头配置文件都要写在 module.exports 中
module.exports = {
    devServer: {
        contentBase: path.resolve('build'),
        compress: true,
        host: '10.9.16.12',
        progress: true,
        port: 8080,
        open: true,
    },
    target: ['web', 'es5'],
    mode: "production",
    bail: true,
    devtool: 'source-map',
    // 指定入口文件
    entry: {
        Fm: "./src/index.ts"
    },
    // 指定到打包后的文件目录
    output: {
        path: path.resolve(__dirname, 'build'),
        // 打包后的文件的文件
        filename: "loader3d.min.js",
        // 打包配置后 （打包后不使用箭头函数）
        environment: {
            arrowFunction: true // 兼容IE11一下
        },
        library: 'Loader3d',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/',
        environment: {
            arrowFunction: false
        }
    },
    // 指定webpack打包时使用的模块
    module: {
        // 指定打包后的规则
        rules: [
            {
                // test 指定生效的文件
                test: /\.ts$/,
                // 使用 ts-loader 编译所有的 .ts的文件
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    // 设置可引用的模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}
