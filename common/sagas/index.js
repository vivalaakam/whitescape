import {
  watchCreateMessage,
  watchFetchMessages,
  watchUpdateMessage,
  watchDeleteMessage
} from '../reducers/messages/list';
import { watchSetMessage } from '../reducers/messages/form';
import { watchFetchAuth, watchAuthentificate, watchSignup, watchSaveAuth } from '../reducers/auth';
import { watchResolveActionModal, watchRejectActionModal } from '../reducers/modal';

export default function* rootSaga() {
  yield [
    watchFetchAuth(),
    watchAuthentificate(),
    watchSignup(),
    watchSaveAuth(),
    watchResolveActionModal(),
    watchRejectActionModal(),
    watchCreateMessage(),
    watchFetchMessages(),
    watchUpdateMessage(),
    watchDeleteMessage(),
    watchSetMessage()
  ];
}
