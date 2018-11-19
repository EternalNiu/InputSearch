import {
  FETCH_SEARCH_BUS_LINE_REQUEST,
  FETCH_SEARCH_BUS_LINE_SUCCEED,
  FETCH_SEARCH_BUS_LINE_FAILURE,
} from './actionTypes';


/**
 * 城市公交线路搜索
 * @param  {Object} options
 * @return {Object}
 */
export const fetchSearchBusLineRequest = (options) => (
  {
    type: FETCH_SEARCH_BUS_LINE_REQUEST,
    payload: {
      ...options,
    },
  }
);

export const fetchSearchBusLineSucceed = (response) => (
  {
    type: FETCH_SEARCH_BUS_LINE_SUCCEED,
    payload: {
      response,
    },
  }
);

export const fetchSearchBusLineFailure = () => (
  {
    type: FETCH_SEARCH_BUS_LINE_FAILURE,
  }
);
