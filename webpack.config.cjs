/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/app.ts", // Your entry point file
    output: {
        filename: "bundle.js", // Output file name
        path: path.resolve(__dirname, "dist") // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply this rule to JavaScript files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: "babel-loader", // Use Babel loader to transpile ES6
                    options: {
                        presets: ["@babel/preset-env"] // Use the preset for modern JavaScript
                    }
                }
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: "pixi.js"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./index.html", // Path to your HTML template
            filename: "index.html" // Output file name
        })
    ],
    devServer: {
        static: path.resolve(__dirname, "dist"), // Directory to serve
        port: 6969 // Development server port
    },
    mode: "development" // Set mode to development, change 'production' once ready
};