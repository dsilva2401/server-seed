var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		app: './src/setup/app/start.ts',
		auth: './src/setup/auth/start.ts',
		database: './src/setup/database/index.ts',
		proxy: './src/setup/proxy/start.ts'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist')
	},
	target: 'node',
	module: {
		loaders: [
			{ test: /\.json$/,  loader: 'json' },        
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	},
	plugins: []
};