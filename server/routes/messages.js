import Router from 'koa-router';
import messages from '../controllers/messages';
import { check } from './auth';

const router = new Router();
router
  .get('/', check, messages.list)
  .get('/:id', check, messages.getId)
  .post('/', check, messages.createItem)
  .put('/:id', check, messages.updateItem)
  .delete('/:id', check, messages.removeItem);

export default router;
