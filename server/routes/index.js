import Router from 'koa-router';
import messages from './messages';
import auth from './auth';
import prefetch from '../controllers/prefetch';
import render from '../middleware/render';

const router = new Router();
const api = new Router();

api
  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/messages', messages.routes(), messages.allowedMethods());

router
  .use('/api', api.routes(), api.allowedMethods());

router
  .get('/', prefetch.messages, render)
  .get('/*', render);


export default router;
