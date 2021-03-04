const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = { //creamos el objeto de configuracion
    entry: './src/index.js', // punto de entrada de nuestra aplicacion
    output: { //donde se guardaran nuestros archivos, por defecto webpack usa dist
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js", //nombre del archivo final
    },
    resolve: { //con que tipo de archivos vamos a usar
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, //tipo de extensiones a trabajar
                exclude: /node_modules/, //no usar modulos node
                use: {
                    loader: 'babel-loader' //usa babel
                } 
            },
            {
                test: /\.css|.styl$/i, //reconocer archivos css
                use: [ MiniCssExtractPlugin.loader, 'css-loader' , 'stylus-loader' ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ //configuracion
            inject: true,  //haga la insercion de los elmento
            template: './public/index.html', //llamamos el template que tenemos
            filename: './index.html' //nombre del archivo final
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            //que elementos vamos a usar
            patterns: [{
                from: path.resolve(__dirname,"src", "assets/images"), //archivos a mover
                to: "assets/images"
            }
                
            ]
        })
    ]
};