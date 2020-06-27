const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

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
    			test: /\.(sass|less|css)$/,
    			loaders: ['style-loader', 'css-loader', 'less-loader']
  			},	
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
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
