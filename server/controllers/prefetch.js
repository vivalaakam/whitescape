import R from 'ramda';
import Todo from '../models/todo';
import Message from '../models/message';

export default {
  todos: async function fetchTodos(ctx, next) {
    const model = new Todo();
    const auth = ctx.state.user;
    const list = await model.list({ user_id: auth.id });
    ctx.prefetch = {
      todos: { list }
    };
    next();
  },
  messages: async function fetchMessages(ctx, next) {
    const model = new Message();
    const auth = ctx.state.user;
    const perPage = 10;
    const list = await model.list({ user_id: auth.id }, [['created_at', 'DESC']], perPage);
    const count = await model.count({ user_id: auth.id });
    ctx.prefetch = {
      messages: {
        list,
        params: {
          loadMore: count > perPage,
          perPage,
          lastTime: R.last(list).created_at
        }
      }
    };
    next();
  }
};
