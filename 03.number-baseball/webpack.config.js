const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// process.env.NODE_ENV='production' // 배포모드

module.exports = {
  name: 'number-baseball-setting',
  mode: 'development', // 배포모드 : production
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'], // 옆의 확장자가 있는지 확인
  },
  entry: {
    app: ['./client'], // 확장자 검색기능을 추가해 확장자 작성하지 않아도 된다.
  }, // 입력
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
                  browsers: ['last 2 chrome versions'],
                  // 디버깅 옵션
                },debug:true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            'react-refresh/babel', // 핫 리로딩
          ],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, 'dist'), // 현재 경로에 있는 'dist'라는 폴더
    filename: '[name].js',
    publicPath: '/dist',
  }, // 출력
  devServer: {
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  }, // 웹팩용 서버
};
