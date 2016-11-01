import Message from '../models/message';

const messageModel = new Message();

export default {
  getId: async function getId(ctx) {
    const data = await messageModel.getId(ctx.params.id);
    ctx.body = data;
  },
  list: async function list(ctx) {
    const auth = ctx.state.user;
    const query = { user_id: auth.id };
    if (ctx.query.lastTime) {
      query.created_at = {
        $lt: ctx.query.lastTime
      };
    }
    const data = await messageModel.list(query, [['created_at', 'DESC']], ctx.query.perPage);
    ctx.body = data;
  },
  createItem: async function createItem(ctx) {
    const auth = ctx.state.user;
    ctx.body = await messageModel.create({ ...ctx.request.body, user_id: auth.id });
    ctx.status = 201;
  },
  updateItem: async function updateItem(ctx) {
    ctx.body = await messageModel.update(ctx.params.id, ctx.request.body);
  },
  removeItem: async function removeItem(ctx) {
    await messageModel.remove(ctx.params.id);
    ctx.body = {
      completed: true
    };
    ctx.status = 204;
  }
};
