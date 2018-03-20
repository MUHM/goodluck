# Good Luck

采用egg.js作为程序主框架，参见 [egg 文档][egg]。  

使用sequelizejs作为orm框架，参见[sequelize 文档][sequelize]。  

页面渲染采用nunjucks，参见[nunjucks][nunjucks]。 

因为react angular vue写不顺手，写不来；html、css更是菜的不行；所以前端部分都是东抄一点西窃一点：

 - manage:
    - 用了基于bootstrap的[INSPINIA - Responsive Admin Theme][inspinia]
    - 然后自己瞎写了些[knockout.js][knockout];
    - markdown编辑器用了[editor.md][editor.md];

 - web:基本没写;

 - api:[goodluck api 文档][goodluck_api];

### DEMO

https://ie.gl

后台:https://ie.gl/manage/home

账号:admin

密码:123456

### 本地开发

```
// config.default.js
config.setup = true; // 请在写入数据库后修改为false
config.sequelize = {}; // 请根据实际使用的数据库进行配置，package.json已包含mssql及mysql所需要的库
```

```bash
$ npm i
$ npm run dev
$ open http://127.0.0.1:7001/
```

### 部署

线上正式环境用 `EGG_SERVER_ENV=prod` 来启动。

可以在config文件夹下新增config.prod.js来覆盖config.default.js中的数据库、加密等配置

```bash
$ EGG_SERVER_ENV=prod npm start
```

### 单元测试

看心情在写，目前覆盖率50%

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run cov` 命令运行单元测试覆盖率。
- 使用 `npm run gl` 把 `app/public/manage/js/`的`gl-admin.js`压缩成`gl-admin.min.js`。

### 其它

其实呢，本来只是想写个后台权限管理的demo的，所以就带了这么一块权限管理系统，但是目前也还没打算改成带多人博客的管理系统，因为只能一点一点来；

代码中使用了腾讯的cos,不使用cdn的话不会有影响；开启cdn但是不使用腾讯cos的话请修改[app/controller/manage/api/image.js][image.js]；

 ### 最后
 # 干死黄旭东！孙一峰永远是我大哥


[egg]: https://eggjs.org
[sequelize]:http://docs.sequelizejs.com
[nunjucks]:http://mozilla.github.io/nunjucks/api.html
[knockout]:http://knockoutjs.com/documentation/introduction.html
[inspinia]:https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S
[goodluck_api]: /api.md
[image.js]:/app/controller/manage/api/image.js
[editor.md]:https://github.com/pandao/editor.md
