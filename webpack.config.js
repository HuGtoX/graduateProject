const path = require('path');

module.exports = {
  devServer: {
   contentBase: './dist',
   port: 9000
  },
  mode:'development',
  //入口文件
  entry:'./index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist') //将路径或路径片段的序列解析为绝对路径。
  },
  // 处理不同类型文件需要的Loader
  module:{
    rules:[
      { test:/\.css$/,
        use:[ 'style-loader','css-loader']
      },
      {
        test:/\.(png|svg|jpg|gif|ico)$/,
        loader:'url-loader?limit=1024&name=[path][name].[ext]&publicPath=dist/'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}