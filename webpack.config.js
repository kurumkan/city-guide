module.exports = {
  entry: [
    './frontend/src/index.jsx'
  ],
  output: {
    path: __dirname,    
    filename: './frontend/public/bundle.js'
  },

  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './frontend/src/components',
      './frontend/src/actions',
      './frontend/src/reducers',      
    ],
    alias: {
      applicationStyles: 'frontend/src/styles/app.scss',      
    },
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{      
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      },
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/
    }]
  }, 
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
};
