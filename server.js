const http = require('http');
const path = require('path');
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const fs = require('fs');
const main = serve(path.join(__dirname))
app.use(main)
var documentRoot = 'F:\musicstation'; //设置文件的根目录，可以修改为个人的自定义目录。
var server = http.createServer(function(req,res) {
    var url = req.url;
    var file = path.join(__dirname,url);
    console.log(url);
    fs.readFile(file,function(err,data) {
        if(err){
            res.writeHeader(404,{
                'content-type':'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type':'text/html;charset=utf-8"'
            });
            res.write(data);
            res.end();
        }
    });
})

app.listen(8080)
console.log('服务器开启成功');