var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: path.join(__dirname, 'app/app.ts'),
	output: {
		dir: '/dist',
		path: __dirname,
		filename: "./dist/bundle.js"
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