/**
 * This module exports saga
 * @module DynamicView/Saga
 */
import {put, takeEvery} from 'redux-saga/effects';

import {
  FETCH_SEARCH_BUS_LINE_REQUEST,
} from './actionTypes';

import {
  fetchSearchBusLineSucceed,
  fetchSearchBusLineFailure,
} from './actions';


/**
 * Fetch SearchBusLine data
 * @param  {object} options
 * @yield {Action}
 */
export function* fetchSearchBusLineRequest(options) {
  try {
    // Fire http request
    const response = {
      data: [{
        index: 1,
        name: '第一个',
      }, {
        index: 2,
        name: '第二个',
      }, {
        index: 3,
        name: '第三个',
      }, {
        index: 4,
        name: '第四个',
      }, {
        index: 5,
        name: '第五个',
      }, {
        index: 6,
        name: '第六个',
      }, {
        index: 7,
        name: '第七个',
      }, {
        index: 8,
        name: '第八个',
      }, {
        index: 9,
        name: '第九个',
      }, {
        index: 0,
        name: '第零个',
      }, {
        index: 0,
        name: '第十一个',
      }, {
        index: 0,
        name: '第十二个',
      }, {
        index: 0,
        name: '第十三个',
      }, {
        index: 0,
        name: '第十四个',
      }, {
        index: 0,
        name: '第十五个',
      }, {
        index: 0,
        name: '第十六个',
      }, {
        index: 0,
        name: '第十七个',
      }, {
        index: 0,
        name: '第十八个',
      }],
    };

    // Fire success action
    yield put(fetchSearchBusLineSucceed(response));
  } catch (err) {
    // Fire failure action
    yield put(fetchSearchBusLineFailure(err));
  }
}


/**
 * Watch api request
 */
export default function* watchFetchAllLocationsConsumerLagsRequest() {
  yield takeEvery(FETCH_SEARCH_BUS_LINE_REQUEST, fetchSearchBusLineRequest);
}
