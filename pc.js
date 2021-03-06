var fs = require('fs')
var shell = require("shelljs")  // 引入 shell 命令模块


var dirName = process.argv[2] // param is second start



// shell.exec("echo hello " + name);

 

if (fs.existsSync(dirName)) {
    console.log('这个文件已经被创建了，请您重新命名文件夹名称');
}else{
    process.chdir("/home/wubowen/Desktop") // cd ~/Desktop  lunix  进入路径而已
    // process.chdir("C:\\Users\\Administrator\\Desktop") // cd ~/Desktop windows
    fs.mkdirSync("./" + dirName) // mkdir $1
    process.chdir("./" + dirName) // cd $1
    fs.mkdirSync('src') // mkdir css
    fs.mkdirSync('src/css') // mkdir src/css
    fs.mkdirSync('src/js') // mkdir src/js
    fs.mkdirSync('src/img') // mkdir src/img
    fs.mkdirSync('dist') // mkdir js
    
    
    // 使用 env 命令从而解决 npm 路径问题
    shell.exec("/usr/bin/env npm init -y")  // 初始化
    shell.exec("/usr/bin/env npm install")  // 安装依赖 
    // 执行的命令的目录在 /usr/bin/git
    // 由于我安装了 node-sass 创建了 .npm-global 
    // 所以我的 npm 命令 在 /home/wubowen/.npm-global/bin/npm 
    // 故 npm install 不能发挥作用





    
    fs.writeFileSync("./.gitignore", 'node_modules')
    fs.writeFileSync("./src/index.html", 
    `<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title> ${dirName} </title>
    <link rel="stylesheet" href="./css/main.css">
</head>
<body>
    
    <script src="./js/main.js"></script>
</body>
</html>`)

    fs.writeFileSync("./src/css/reset.scss", 
    `*{ margin:0; padding:0; }
li{list-style: none;}
a{color: inherit; text-decoration:none;}
h1,h2,h3,h4,h5,h6{font-weight: normal;}
.clearfix::after{content:"";display:block;clear:both;}
body{font-family: -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    font-size: 12px;
}
`)

    fs.writeFileSync("./src/css/main.scss", `@import './reset.scss';`)
    fs.writeFileSync("./src/js/main.js", 
    `{
      
}`)
    fs.writeFileSync("./src/js/temp.js",
    `{
    let view = {
        el: '',
        template: '',
        init() { // 初始化

        },   
        render(data = {}) { // 初始 render

        }, 
        create(data) { // 创建新的项
            console.log(data)
        }, 
        update(data) { // 局部更新视图

        }, 
        // 切换状态函数
        active() { // 激活，添加 active 类

        },
        deactive() { // 移除激活，移除 active 类

        },
    }
    let model = {
        data: {},
        init() { // 初始化

        }, 
        create(data) { // 创建数据 ==> 更新 data
            console.log(data)
        },
        update(data) { // 编辑数据 ==> 更新 data
            console.log(data)
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.model.init()
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventhub()
        },
        bindEvents(){

        },
        bindEventHub() {
            window.eventHub.on('', (data) => {
                console.log(data)
            })
        },
    }
    controller.init(view, model)
}`)
    fs.writeFileSync("./src/js/eventHub.js", 
    `{
    window.eventHub = {
        events: {},
        emit(eventName, data) {  // 发布
            for(let key in this.events){
                if(key === eventName){
                    this.events[key].map(fn => fn.call(null, data))
                }
            }
        },
        on(eventName, cb) {  // 订阅
            if(!this.events[eventName]){
                this.events[eventName] =[]
            }
            this.events[eventName].push(cb)
        }
    }
}`)
    fs.writeFileSync("README.md", "## "+dirName)


    
    shell.exec("git init")  // 初始化仓库
    shell.exec("git add .")  // 初始化仓库
    shell.exec("git commit -m '创建'")  // 初始化仓库
    
    shell.exec("http-server -c-1")
    process.exit(0)
}


