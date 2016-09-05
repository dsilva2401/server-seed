var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/setup/polyfills.browser.ts',
    'vendor':    './src/setup/vendor.browser.ts',
    'main':       './src/setup/main.browser.ts',
  },

  output: {
    path: './',
    filename: 'src/dist/[name].bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['src'] }
    })
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.jade$/, loader: "jade" },
      { test: /\.styl$/, loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.json$/,  loader: 'json' }
    ]
  },

  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js', '.jade', 'styl']
  },

};