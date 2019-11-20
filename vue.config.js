module.exports = {
  lintOnSave:false,
  //指向开发服务器
  devServer:{
    proxy:{
      //指定替换
      '/portal':{
        target:'http://212.64.74.101:8089',//后端服务器的域名
        // target:'http://localhost:8089',//后端服务器的域名
        ws: true,//是否代理webSockets
        changeOrigin: true//设置同源，默认false，是否需要改变最原始主机为目标URL
      }
    }
  }
}
