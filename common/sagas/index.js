import {
  watchCreateTodo,
  watchFetchTodos,
  watchUpdateTodo,
  watchDeleteTodo,
  watchToggleTodo,
  watchCompleteAllTodos,
  watchClearCompletedTodos
} from '../reducers/todos/list';
import {
  watchCreateMessage,
  watchFetchMessages,
  watchUpdateMessage,
  watchDeleteMessage
} from '../reducers/messages/list';
import { watchSetMessage } from '../reducers/messages/form';
import { watchFetchAuth, watchAuthentificate, watchSignup } from '../reducers/auth';
import { watchResolveActionModal, watchRejectActionModal } from '../reducers/modal';

export default function* rootSaga() {
  yield [
    watchCreateTodo(),
    watchFetchTodos(),
    watchUpdateTodo(),
    watchDeleteTodo(),
    watchToggleTodo(),
    watchCompleteAllTodos(),
    watchClearCompletedTodos(),
    watchFetchAuth(),
    watchAuthentificate(),
    watchSignup(),
    watchResolveActionModal(),
    watchRejectActionModal(),
    watchCreateMessage(),
    watchFetchMessages(),
    watchUpdateMessage(),
    watchDeleteMessage(),
    watchSetMessage()
  ];
}
