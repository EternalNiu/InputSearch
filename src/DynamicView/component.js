/**
 * @module DynamicView
 */
import React from 'react';
import {object, func, array} from 'prop-types';
import {withStyles} from 'material-ui/styles';

import Input from './components/Input';

const styles = (theme) => ({
  root: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
  },
  button: {
    position: 'absolute',
    top: '60px',
    right: '10px',
    zIndex: '120',
    display: 'flex',
  },
});

@withStyles(styles)
/**
 * Exports DynamicView component
 */
export default class DynamicView extends React.Component {
  /**
   * Props validation
   * Declares props validation as high as possible,
   * since they serve as documentation.
   * We’re able to do this because of JavaScript function hoisting.
   */
  static propTypes = {
    classes: object.isRequired,
    searchBusLineList: array.isRequired,
    fetchSearchBusLineRequest: func.isRequired,
  };

  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      isShowInput: true,
    };
  }
  /**
   * SearchInput value change callback
   * fetch new busList if input value change
   * @param {Object} lineName the value of input
   */
  onInputSearchChange(lineName) {
    this.props.fetchSearchBusLineRequest(lineName);
  }

  /**
   * To hide realBuses
   * @param {Boolean} isShow
   */
  showAsyncInput(isShow) {
    this.setState({
      ...this.state,
      isShowInput: isShow,
      isShowRealBuses: !isShow,
    });
  }

  /**
   * Render DynamicView component
   * @return {Component} - DynamicView component
   */
  render() {
    const {
      classes,
      searchBusLineList,
    } = this.props;

    const {
      isShowInput,
    } = this.state;


    return (
      <div className={classes.root}>
        <div className={classes.button}>
          <Input
            isShow={isShowInput}
            searchBusLineList={searchBusLineList}
            onChange={this.onInputSearchChange.bind(this)}
            showAsyncInput={this.showAsyncInput.bind(this)}
          />
        </div>
      </div>
    );
  }
}
