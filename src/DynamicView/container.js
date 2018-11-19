/**
 * DynamicView Container Module
 * @module DynamicView/Container
 * @requires react-redux
 * @requires {@link module:DynamicView/Component}
 */
import {connect} from 'react-redux';

import Component from './component';
import {
  fetchSearchBusLineRequest,
} from './actions';

const mapStateToProps = (state, ownProps) => {
  return {
    searchBusLineList: state.dynamicView.searchBusLineList.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSearchBusLineRequest: (payload) => {
      dispatch(fetchSearchBusLineRequest(payload));
    },
  };
};

/**
 * Connected react component
 */
@connect(mapStateToProps, mapDispatchToProps)
class Container extends Component {

}

/**
 * Return redux connected DynamicView page
 */
export default Container;
