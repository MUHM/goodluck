/*
 * @Author: MUHM
 * @Date: 2018-01-18 14:41:41
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-02-27 15:06:47
 */
'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const api = /^\/manage\/api.*$/.test(ctx._matchedRoute);
    if (!ctx.session.userId) {
      ctx.status = 401;
      api ? ctx.body = {
        code: ctx.status,
        msg: ctx.__('401 Unauthorized'),
      } : ctx.redirect(`/account/login?redirectURL=${ctx.originalUrl}`);
      return;
    }
    // 重复登录验证
    const user = await ctx.service.user.findById(ctx.session.userId);
    if (user.session_token !== ctx.session.token) {
      ctx.session.userId = null;
      ctx.session.token = null;
      ctx.redirect(`/account/login?redirectURL=${ctx.originalUrl}`);
      return;
    }
    ctx.locals.username = user.truename ? user.truename : user.name;
    ctx.locals.user = user;
    ctx.session.save();
    const permission = await ctx.service.permission.findByRoute(ctx._matchedRoute, ctx.method);
    if (!permission) {
      await next();
      return;
    }
    const roles = await user.getRoles();
    let temp = false;
    for (const role of roles) {
      temp = await permission.hasRole(role);
      if (temp) {
        break;
      }
    }
    if (!temp) {
      ctx.status = 403;
      api ? ctx.body = {
        code: ctx.status,
        msg: ctx.__('403 Forbidden'),
      } : ctx.redirect('/manage/403');
      return;
    }
    await next();
  };
};
