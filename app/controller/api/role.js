/*
 * @Author: MUHM
 * @Date: 2018-01-12 09:34:36
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-03-22 10:04:00
 */
'use strict';

module.exports = app => {
  class ApiRoleController extends app.Controller {
    async index() {
      const { ctx } = this;
      const limit = ctx.helper.getLimit();
      const offset = ctx.helper.getOffset();
      const roles = await ctx.service.role.findAllByPage(null, limit, offset);
      ctx.body = {
        code: 200,
        data: roles.rows,
        recordsTotal: roles.count,
        recordsFiltered: roles.count,
        draw: ctx.query.draw,
      };
    }
    async show() {
      const { ctx } = this;
      const role = await ctx.service.role.findById(ctx.params.id);
      if (!role) {
        ctx.body = {
          code: 404,
          msg: ctx.__('404 Not found'),
        };
        return;
      }
      const permissions = await role.getPermissions();
      ctx.body = {
        code: 200,
        data: { role, permissions },
      };
    }
    async create() {
      const { ctx } = this;
      const item = {
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        created_by: ctx.locals.user.id,
      };
      const role = await ctx.service.role.create(item);
      await role.setPermissions(ctx.request.body.permissions);
      ctx.body = {
        code: 200,
        msg: ctx.__('Create success'),
      };
    }
    async update() {
      const { ctx } = this;
      const item = {
        id: ctx.request.body.id,
        name: ctx.request.body.name,
        description: ctx.request.body.description,
        updated_by: ctx.locals.user.id,
      };
      await ctx.service.role.update(item, ctx.request.body.permissions);
      ctx.body = {
        code: 200,
        msg: ctx.__('Update success'),
      };
    }
    async destroy() {
      const { ctx } = this;
      const result = await ctx.service.role.destroy(ctx.params.id);
      ctx.body = result === 1 ? { code: 200, msg: ctx.__('Destroy success') } : { code: 400, msg: ctx.__('Destroy fail') };
    }
  }
  return ApiRoleController;
};
