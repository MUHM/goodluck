/*
 * @Author: MUHM
 * @Date: 2017-10-20 09:51:41
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-03-27 10:49:49
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

exports.alinode = {
  enable: true,
  package: 'egg-alinode',
};
