var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		api: './src/setup/api/start.ts',
		auth: './src/setup/auth/start.ts',
		database: './src/setup/database/index.ts',
		proxy: './src/setup/proxy/start.ts',
		statics: './src/setup/statics/start.ts',
		webapps: './src/setup/webapps/start.ts',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist')
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
	},
	module: {
		loaders: [
			{ test: /\.json$/,  loader: 'json' },        
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.node$/, loader: 'node-loader' }
		]
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".node"]
	},
	plugins: []
};