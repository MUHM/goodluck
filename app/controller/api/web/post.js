/*
 * @Author: MUHM
 * @Date: 2019-03-15 17:59:49
 * @Last Modified by: MUHM
 * @Last Modified time: 2019-03-15 18:01:40
 */
'use strict';

module.exports = app => {
  class PostController extends app.Controller {
    async index() {
      const { ctx } = this;
      const limit = ctx.helper.getLimit();
      const offset = ctx.helper.getOffset();
      const tagWhere = ctx.helper.isNull(ctx.query.tag_id) ? null : { id: ctx.query.tag_id };
      const posts = await ctx.service.post.findAllByPage({ status: 1 }, tagWhere, limit, offset);
      ctx.body = {
        code: 200,
        data: posts.rows,
        recordsTotal: posts.count,
        recordsFiltered: posts.count,
        draw: ctx.query.draw,
        totalPage: parseInt((posts.count + limit - 1) / limit),
        pageIndex: parseInt(offset / limit) + 1 > 0 ? parseInt(offset / limit) + 1 : 1,
      };
    }
    async show() {
      const { ctx } = this;
      const post = await ctx.service.post.findById(ctx.params.id);
      if (!post) {
        // ctx.status = 404;
        ctx.body = {
          code: 404,
          msg: ctx.__('404 Not found'),
        };
        return;
      }
      ctx.body = {
        code: 200,
        data: post,
      };
    }
    async slug() {
      const { ctx } = this;
      const id = ctx.query.id;
      const slug = ctx.helper.safeUrl(ctx.query.slug);
      // 因为slug有唯一约束，所以加上paranoid: false,查询的数据包含软删除数据
      const post = await ctx.model.Post.findOne({ where: { slug }, paranoid: false });
      if (post) {
        ctx.body = post.id === id;
      } else {
        ctx.body = true;
      }
    }
  }
  return PostController;
};
