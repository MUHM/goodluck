/*
 * @Author: MUHM
 * @Date: 2018-01-11 13:01:13
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-01-23 11:46:57
 */
'use strict';

module.exports = app => {
  return class Permission extends app.Service {
    /**
    * 查询权限列表
    * @param {Object} [where] - 查询条件
    * @param {Integer} [limit] - limit
    * @param {Integer} [offset] - offset
    * @param {Array} [order] - order 默认[['created_at', 'DESC']]
    * @return {Promise} 权限列表
    */
    findAllByPage(where, limit, offset, order = [['created_at', 'DESC']]) {
      return this.ctx.model.Permission.findAndCountAll({
        where,
        order,
        limit,
        offset,
      });
    }
    /**
    * 根据url查询权限
    * @param {String} [url] - url
    * @param {String} [method] - method
    * @return {Promise} 权限列表
    */
    findByRoute(url, method) {
      return this.ctx.model.Permission.findOne({
        where: {
          url,
          method,
        },
      });
    }
    /**
    * 获取用户菜单列表
    * @param {Integer} [user_id] - 用户id
    * @return {Promise} 菜单列表
    */
    findUserMenu(user_id) {
      return this.ctx.model.query('select a.id,a.parent_id,a.name,a.url,a.icon,a.controller,a.sort from permission  as a where a.deleted_at is null and a.is_menu=1 and a.id in (select permission_id from role_permission where deleted_at is null and role_id in (select role_id from role_user where deleted_at is null and user_id=:user_id)) order by sort asc;', {
        replacements: {
          user_id,
        },
        type: this.ctx.model.QueryTypes.SELECT,
      });
    }
  };
};
