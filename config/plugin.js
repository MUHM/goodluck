/*
 * @Author: MUHM
 * @Date: 2017-10-20 09:51:41
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-02-24 15:39:53
 */
'use strict';

// 启用静态资源
exports.static = true;

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
