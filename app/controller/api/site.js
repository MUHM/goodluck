/*
 * @Author: MUHM
 * @Date: 2018-01-12 13:37:22
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-03-27 16:17:56
 */
'use strict';

module.exports = app => {
  class SiteController extends app.Controller {
    async index() {
      const { ctx } = this;
      const limit = ctx.helper.getLimit();
      const offset = ctx.helper.getOffset();
      const settings = await ctx.service.setting.findAllByPage(null, limit, offset);
      const result = {
        code: 200,
        data: settings.rows,
        recordsTotal: settings.count,
        recordsFiltered: settings.count,
        draw: ctx.query.draw,
      };

      ctx.body = result;
    }
    async show() {
      const { ctx } = this;
      const setting = await ctx.service.setting.findById(ctx.params.id);
      if (!setting) {
        ctx.body = {
          code: 404,
          msg: ctx.__('404 Not found'),
        };
        return;
      }
      ctx.body = {
        code: 200,
        data: setting,
      };
    }
    async update() {
      const { ctx } = this;
      await ctx.service.setting.update(ctx.request.body.id, ctx.request.body.value);
      // 修改后执行任务
      await app.runSchedule('app_locals');
      ctx.body = {
        code: 200,
        msg: ctx.__('Update success'),
      };
    }
  }
  return SiteController;
};
