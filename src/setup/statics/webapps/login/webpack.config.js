var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: path.join(__dirname, './main.ts'),
	output: {
		path: __dirname,
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