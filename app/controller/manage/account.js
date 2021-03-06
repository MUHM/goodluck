/*
 * @Author: MUHM
 * @Date: 2018-01-11 11:10:53
 * @Last Modified by: MUHM
 * @Last Modified time: 2018-03-23 13:27:01
 */
'use strict';

module.exports = app => {
  class AccountController extends app.Controller {
    async login() {
      const { ctx } = this;
      if (ctx.session.userId) {
        return ctx.redirect('/');
      }
      await ctx.render('manage/account/login', {
        redirectURL: ctx.query.redirectURL ? ctx.query.redirectURL : '/',
      });
    }
    async register() {
      const { ctx } = this;
      await ctx.render('manage/account/register');
    }
    async logout() {
      const { ctx } = this;
      ctx.session = null;
      await ctx.redirect('/');
    }
    async password() {
      const { ctx } = this;
      if (!ctx.session.userId) {
        return ctx.redirect('/');
      }
      await ctx.render('manage/account/password');
    }
  }
  return AccountController;
};
