

const path = require('path');const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {  
	entry:'./src/index.js',
//This property defines where the application starts 

    output:{    
    	path: path.join(__dirname, '/dist'),    
    	filename: 'bundle.js'  
    },
//This property defines the file path and the file name which will be used for deploying the bundled file

    module: {  
    	rules: [
    		{  
				test: /\.js$/, 
				exclude: /node_modules/,   
				use: {   
					loader: 'babel-loader'  
				} 
    		},
    		{
				test: /\.(sass|css|scss)$/,
				use: [
				  'style-loader',
				  'css-loader',
				  'less-loader'
				  {
				    loader: "postcss-loader",
				    options: {
				      plugins: () => [
				        require("autoprefixer")()
				      ],
				    },
				  },
				  'sass-loader',
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				use: {
				  loader: 'file-loader',
				  options: {
				    name: '[name].[ext]',
				    publicPath: 'fonts',
				    outputPath: 'fonts',
				  }
				}
      		},
    	]
	},
	resolve: {
		extensions: ['.js','.jsx', '.css']	
	},

//Setup loaders	

    plugins: [  
    	new HtmlWebpackPlugin({      
    		template: './src/index.html'    })  
    ]
// Setup plugin to use a HTML file for serving bundled js files
    
});

}
