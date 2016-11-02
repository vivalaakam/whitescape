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
