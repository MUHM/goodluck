/*
 * @Author: MUHM
 * @Date: 2017-10-20 09:51:35
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-03-21 16:00:57
 */
'use strict';

module.exports = appInfo => {
  const config = {};
  // should change to your own
  config.keys = appInfo.name + '_1499319408248_7916';
  // session
  config.session = {
    key: 'glhf',
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
    encrypt: true,
  };
  // 页面模版
  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  config.nunjucks = {
    cache: true,
  };
  // sequelize
  config.sequelize = {
    define: {
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true,
      timezone: '+08:00',
    },
    username: '***',
    password: '***',
    database: '***',
    host: '***',
    port: 8888, // 3306/1433
    dialect: 'mysql/mssql',
    force: false,
    timezone: '+08:00',
    // logging: false,
  };
  config.security = {
    csrf: {
      ignore: /^\/api\/open\/.*$/,
    },
  };
  config.middleware = ['authClient'];
  config.authClient = {
    match: /^\/api\/open\/.*$/,
  };
  config.onerror = {
    json(err, ctx) {
      ctx.body = {
        code: ctx.status,
        msg: err.message,
      };
    },
  };
  config.cos = {
    AppId: '1250000000',
    SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    SecretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  };
  config.setup = true; // 请在写入数据库后修改为false

  return config;
};
