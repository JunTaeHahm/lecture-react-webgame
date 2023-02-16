const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'gugudan-setting',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: ['./client'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  // 지원되는 브라우저 설정, browserlist
                  browsers: ['> 5% in KR', 'last 2 chrome versions'],
                  // 디버깅 옵션
                  debug: true,
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
        },
      },
    ],
  },
  plugins: [],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
};

