/**
 * @module Input
 */
import React from 'react';
import {object, array, func, bool} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import AsyncInput from 'Common/AsyncInput';
import searchIcon from './search.png';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  search: {
    width: '30px',
    height: '30px',
    opacity: '0.9',
    background: 'rgba(13,18,34,0.9)',
    border: '1px solid rgba(137,160,231,0.4)',
    borderRadius: '2px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    background: `url(${searchIcon}) no-repeat`,
    backgroundSize: '100% 100%',
  },
  asyncInput: {
    width: '330px',
  },
  hide: {
    display: 'none',
  },
});

@withStyles(styles)
/**
 * Exports Input component
 */
export default class Input extends React.Component {
  /**
   * Props validation
   * Declares props validation as high as possible,
   * since they serve as documentation.
   * We’re able to do this because of JavaScript function hoisting.
   */
  static propTypes = {
    classes: object.isRequired,
    isShow: bool.isRequired,
    searchBusLineList: array.isRequired,
    onChange: func.isRequired,
    showAsyncInput: func.isRequired,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      isShowAsyncInput: false,
    };
  }

  /**
   * ComponentDidMount
   */
  componentDidMount() {
    document.onclick = () => {
      if (this.state.isShowAsyncInput === true) {
        this.setState({
          ...this.state,
          isShowAsyncInput: false,
        });
        this.props.showAsyncInput && this.props.showAsyncInput(false);
      }
    };
  }

  /**
   * onInputRootClick
   * @param {Object} event
   */
  onInputRootClick(event) {
    event.nativeEvent.stopImmediatePropagation();
  }


  /**
   * @param  {String} value
   */
  onChange(value) {
    this.props.onChange && this.props.onChange(value);
  }

  /**
   * OnSearchClick
   * @param {Object} event
   */
  onSearchClick(event) {
    event.nativeEvent.stopImmediatePropagation();
    this.setState({
      ...this.state,
      isShowAsyncInput: true,
    });
    this.props.showAsyncInput && this.props.showAsyncInput(true);
  }

  /**
   * Render Input component
   * @return {Component} - Input component
   */
  render() {
    const {
      classes,
      searchBusLineList,
      isShow,
    } = this.props;

    const {
      isShowAsyncInput,
    } = this.state;

    const searchClassName = classNames(classes.search, {
      [classes.hide]: isShowAsyncInput === true,
    });

    const asyncInputClassName = classNames(classes.asyncInput, {
      [classes.hide]: isShowAsyncInput === false,
    });

    return (
      <div className={classes.root}>
        <div className={searchClassName} onClick={this.onSearchClick.bind(this)}>
          <i className={classes.searchIcon}></i>
        </div>
        <div className={asyncInputClassName} onClick={this.onInputRootClick.bind(this)}>
          <AsyncInput
            isShow={isShow && isShowAsyncInput}
            searchResult={searchBusLineList}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
