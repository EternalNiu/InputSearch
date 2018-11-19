/**
 * Saga entrance file
 * @requires redux-saga
 * @requires redux-form-saga
 * @requires {@link module:Speed/Saga}
 */
import {all} from 'redux-saga/effects';

import dynamicView from './DynamicView/saga';
import busStopCoverage from './BusStopCoverage/saga';
import lineStopDetail from './LineStopDetail/saga';

/**
 * [*rootSaga description]
 * @yield {[type]} [description]
 */
export default function* rootSaga() {
  yield all([
    dynamicView(),
    busStopCoverage(),
    lineStopDetail(),
  ]);
}
