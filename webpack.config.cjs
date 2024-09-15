const path = require('path');

module.exports = {
  entry: './src/app.js', // Your entry point file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to JavaScript files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile ES6
          options: {
            presets: ['@babel/preset-env'], // Use the preset for modern JavaScript
          },
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Directory to serve
    port: 9000, // Development server port
  },
  mode: 'development', // Set mode to development
};