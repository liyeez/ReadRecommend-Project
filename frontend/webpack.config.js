const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

// Dev/Prod API URL
var API_URL = {
    production: JSON.stringify("https://capstonebackend.simonliveshere.com"),
    development: JSON.stringify("http://localhost:8000")
}

var environment = function () {
    switch(process.env.NODE_ENV) {
        case "production":
            return "production";
        case "development":
            return "development";
        default:
            return "production";
    };
};

module.exports = {
    // Needed to get VSCode debugging to work
    context: path.join(__dirname, "src"),
    mode: "development",
    devtool: "source-map",

    // Build settings
    target: "web",
    entry: {
        index: path.join(__dirname, "src", "js", "index.tsx"),
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "src", "js"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "@teamsupercell/typings-for-css-modules-loader",
                    {
                        loader: "css-loader",
                        options: { modules: true }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "../fonts"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js",'.json']
    },
    // fs error: https://github.com/webpack-contrib/css-loader/issues/447
    node: {
        fs: "empty"
    },

    // Dev server
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 8080,
        // For live reload
        publicPath: "/js/",
        watchContentBase: true,
        // Needed for VSCode debugging
        writeToDisk: true,
        // Needed for React DOM Routing
        historyApiFallback: true
    },

    // Dev/Prod API url
    plugins: [
        new webpack.DefinePlugin({
            API_URL: API_URL[environment()]
        })
    ],

    // Copy in css files so npm keeps them up to date for us
    // path.join doesnt seem to work too well so use relative paths here
    // plugins: [
    //     new CopyPlugin({
    //         patterns: [
    //             {
    //                 Bootstrap - not used anymore
    //                 from: "../node_modules/bootstrap/dist/css/bootstrap.min*",
    //                 to: "../css/[name].[ext]"
    //             }
    //         ],
    //         options: {
    //             concurrency: 100,
    //         }
    //     }),
    // ]



};
