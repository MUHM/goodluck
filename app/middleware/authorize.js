/*
 * @Author: MUHM
 * @Date: 2018-01-18 14:41:41
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-03-23 13:24:06
 */
'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const api = /^\/api.*$/.test(ctx._matchedRoute);
    if (!ctx.session.userId) {
      ctx.status = 401;
      api ? ctx.body = {
        code: ctx.status,
        msg: ctx.__('401 Unauthorized'),
      } : ctx.redirect(`/manage/login?redirectURL=${ctx.originalUrl}`);
      return;
    }
    const user = await ctx.service.user.findById(ctx.session.userId);
    // 重复登录验证
    // if (user.session_token !== ctx.session.token) {
    //   ctx.session = null;
    //   api ? ctx.body = {
    //     code: ctx.status,
    //     msg: ctx.__('401 Unauthorized'),
    //   } : ctx.redirect(`/manage/login?redirectURL=${ctx.originalUrl}`);
    //   return;
    // }
    ctx.locals.username = user.truename ? user.truename : user.name;
    ctx.locals.user = user;
    ctx.session.save();
    const flag = await ctx.service.permission.checkRole(ctx._matchedRoute, ctx.method, user.id);
    if (!flag) {
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
