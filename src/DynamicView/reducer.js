/**
 * This module receives redux actions and responses with action handlers
 * @module DynamicView/Reducer
 */
import {
  FETCH_SEARCH_BUS_LINE_REQUEST,
  FETCH_SEARCH_BUS_LINE_SUCCEED,
  FETCH_SEARCH_BUS_LINE_FAILURE,
} from './actionTypes';

/**
 * Initial state value of react store
 */
const initialState = {
  searchBusLineList: {
    data: [],
    isLoading: false,
  },
};

const searchBusLineReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SEARCH_BUS_LINE_REQUEST:
      // Switch on loading indicator
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SEARCH_BUS_LINE_SUCCEED:
      return {
        ...state,
        data: action.payload.response.data,
        isLoading: false,
      };
    case FETCH_SEARCH_BUS_LINE_FAILURE:
      return {
        ...initialState.searchBusLineList,
      };
    default:
      return state;
  }
};


/**
 * Reducer function manipulates home leaf node of redux store
 * @param {Object} state - Previous leaf node of redux store
 * @param {Object} action - Redux action
 * @param {string} action.type - Redux action name
 * @return {Object}
 */
export default function Reducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_BUS_LINE_REQUEST:
    case FETCH_SEARCH_BUS_LINE_SUCCEED:
    case FETCH_SEARCH_BUS_LINE_FAILURE:
      return {
        ...state,
        searchBusLineList: searchBusLineReducer(state.searchBusLineList, action),
      };
    default:
      return state;
  }
}
