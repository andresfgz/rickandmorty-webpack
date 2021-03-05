const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = { //creamos el objeto de configuracion
    entry: './src/index.js', // punto de entrada de nuestra aplicacion
    output: { //donde se guardaran nuestros archivos, por defecto webpack usa dist
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js", //nombre del archivo final
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    resolve: { //con que tipo de archivos vamos a usar
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
          }
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
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader', //loader
                    options: { //donde estan los archivos y config
                        limit: 10000,
                        mimetype: 'aplication/font-woff',
                        name: "[name].[contenthash].[ext]", //respetar la extension que tiene
                        outputPath: "./assets/fonts/", //hacia donde va
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ //configuracion
            inject: true,  //haga la insercion de los elmento
            template: './public/index.html', //llamamos el template que tenemos
            filename: './index.html' //nombre del archivo final
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name][contenthash].css'
        }),
        new CopyPlugin({
            //que elementos vamos a usar
            patterns: [{
                from: path.resolve(__dirname,"src", "assets/images"), //archivos a mover
                to: "assets/images"
            } 
            ]
        }),
        new Dotenv(),
    ],
};