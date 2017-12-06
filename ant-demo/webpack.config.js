var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");



module.exports={
    entry:path.resolve(__dirname,"src/index.js"),
    output:{
        path:path.resolve(__dirname, "lib/dist"),
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:"style-loader"
                },{
                    loader:"css-loader"
                }]
            },
            {
                test:/\.less$/,
                use:[{
                    loader:"style-loader"
                },{
                    loader:"css-loader"
                },{
                    loader:"less-loader"
                }]
            },{
                test:/\.js$/,
                use:[{
                    loader:"babel-loader",
                    options:{
                        presets:["react","env"]
                    }
                }
                ]
            },{
                test:/\.(ttf|woff|woff2|eot|svg)$/,
                use:[{
                    loader:"url-loader"
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        port:9401
        },    
    plugins:[new HtmlWebpackPlugin({
        template:path.resolve(__dirname,"src/index.tpl.html"),
        filename:"index.html",
        inject:false
    })]

};
