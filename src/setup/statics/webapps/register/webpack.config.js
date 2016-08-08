var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: path.join(__dirname, 'app/main.ts'),
	output: {
		dir: '/dist',
		path: path.join(__dirname,'/dist'),
		filename: "./bundle.js"
	},
	module: {
		loaders: [
			// { test: /\.css$/, loader: "style!css" },
			{ test: /\.json$/, loader: "json" },
			{ test: /\.ts$/, loader: 'ts' },
			// { test: /\.html$/, loader: 'html' }
		]
	}
};