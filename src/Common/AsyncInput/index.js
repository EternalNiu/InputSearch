/**
 * @module AsyncInput
 */
import React from 'react';
import {object, bool, string, number, array, func} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import Defer from 'Util/Defer';
import searchIcon from './search.png';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  inputWrap: {
    width: '100%',
    height: '30px',
    position: 'relative',
    '&::before': {
      content: '" "',
      position: 'absolute',
      top: '50%',
      left: '3px',
      transform: 'translate3d(0,-50%,0)',
      zIndex: '9',
      display: 'inline-block',
      width: '19px',
      height: '19px',
      background: `url(${searchIcon}) no-repeat`,
      backgroundSize: '100% 100%',
    },
  },
  input: {
    width: '100%',
    height: '100%',
    border: '1px solid rgba(78, 147, 255, 0.68)',
    boxShadow: '0px 5px 6px 0 rgba(52, 93, 177, 0.29)',
    borderRadius: '2px',
    color: '#f1f7ff',
    opacity: '0.95',
    background: '#010615',
    paddingLeft: '25px',
    fontSize: '12px',
  },
  searchResult: {
    width: '100%',
    marginTop: '10px',
    fontSize: '12px',
    padding: '0 5px',
    background: '#000102',
    color: '#fff',
    border: '1px solid #4c63a8',
    cursor: 'pointer',
    overflow: 'auto',
  },
  hide: {
    display: 'none',
  },
  result: {
    height: '30px',
    lineHeight: '30px',
    '&:hover': {
      color: '#0090ff',
    },
  },
  selectedResult: {
    color: '#279cff',
    background: '#06123a',
  },
});

@withStyles(styles)
/**
 * Exports AsyncInput component
 */
export default class AsyncInput extends React.Component {
  /**
   * Props validation
   * Declares props validation as high as possible,
   * since they serve as documentation.
   * We’re able to do this because of JavaScript function hoisting.
   */
  static propTypes = {
    classes: object.isRequired,
    isShow: bool.isRequired,
    placeholder: string.isRequired,
    delayedTime: number.isRequired,
    searchResult: array.isRequired,
    showNumber: number.isRequired, // Show scroll once more than showNumber
    onChange: func,
    onResult: func,
  };

  static defaultProps = {
    isShow: true,
    placeholder: '搜索',
    delayedTime: 1000,
    showNumber: 10,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.delayedSearch = new Defer(this.props.delayedTime);

    this.state = {
      value: '',
      selectedIndex: 0,
      scrollTop: 0,
      resultList: [],
    };
  }

  /**
   * Set result dom max-height once searchResultWrap dom is rendered at first
   */
  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.resultList.length !== 0
        && this.searchResultRef
        && this.searchResultRef.style.maxHeight === ''
      ) {
        this.searchResultRef.style.maxHeight = `${(this.searchResultWrapRef.clientHeight / this.state.resultList.length) * this.props.showNumber}px`;
      }
    }, 60);
  }

  /**
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResult.length !== 0) {
      this.setState({
        ...this.state,
        resultList: nextProps.searchResult,
      });
    }
    if (nextProps.isShow === true && this.props.isShow === false) {
      this.setState({
        ...this.state,
        value: '',
        selectedIndex: 0,
        scrollTop: 0,
        resultList: [],
      });
    }
    return;
  }

  /**
   * @param  {Object} event - React event
   */
  onChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      value: value,
      selectedIndex: 0,
      scrollTop: 0,
    });

    this.delayedSearch.exec(() => {
      this.props.onChange && this.props.onChange(value); // Exposed api
    });
  }

  /**
   * @param  {Object} event [description]
   */
  onKeyDown(event) {
    event.stopPropagation();
    const {resultList} = this.state;
    const everyResultHeight = this.searchResultWrapRef.clientHeight / resultList.length;
    switch (event.keyCode) {
      // Next key
      case 40: {
        const selectedIndex = this.state.selectedIndex !== resultList.length - 1
          ? this.state.selectedIndex + 1
          : resultList.length - 1;

        const extraShowNumber = selectedIndex + 1 - this.props.showNumber;

        this.setState({
          ...this.state,
          value: resultList[selectedIndex].name,
          selectedIndex: selectedIndex,
          scrollTop: extraShowNumber > 0
            ? everyResultHeight * extraShowNumber
            : 0,
        });
        break;
      }
      // Up key
      case 38: {
        event.preventDefault(); // Prevent the foremost focus
        const selectedIndex = this.state.selectedIndex !== 0
          ? this.state.selectedIndex - 1
          : 0;

        const extraShowNumber = selectedIndex + 1 - this.props.showNumber;

        this.setState({
          ...this.state,
          value: resultList[selectedIndex].name,
          selectedIndex: selectedIndex,
          scrollTop: extraShowNumber > 0
            ? everyResultHeight * extraShowNumber
            : 0,
        });
        break;
      }
      // Enter key
      case 13:
        this.props.onResult && this.props.onResult(resultList[this.state.selectedIndex]); // Exposed api
        break;
      default:
        break;
    }
  }

  /**
   * @param  {Object} searchMes
   * @param  {Number} index
   */
  onResultClick(searchMes, index) {
    this.setState({
      ...this.state,
      selectedIndex: index,
      value: searchMes.name,
    });
    this.props.onResult && this.props.onResult(searchMes); // Exposed api
  }

  /**
   * Render AsyncInput component
   * @return {Component} - AsyncInput component
   */
  render() {
    const {
      classes,
      isShow,
      placeholder,
    } = this.props;

    const {
      value,
      selectedIndex,
      resultList,
    } = this.state;

    if (isShow === false) {
      return null;
    }

    const searchResultElement = (
      resultList.map((searchMes, index) => {
        const resultClassName = classNames(classes.result, {
          [classes.selectedResult]: index === selectedIndex,
        });
        return (
          <div
            key={index}
            className={resultClassName}
            onClick={this.onResultClick.bind(this, searchMes, index)}
          >
            {searchMes.name}
          </div>
        );
      })
    );

    const searchResultClassName = classNames({
      [classes.searchResult]: resultList.length !== 0,
    });

    if (this.searchResultRef) {
      this.searchResultRef.scrollTop = this.state.scrollTop;
    }

    return (
      <div className={classes.root}>
        <div className={classes.inputWrap}>
          <input className={classes.input}
            placeholder={placeholder}
            value={value}
            onChange={this.onChange.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
          />
        </div>
        <div
          className={searchResultClassName}
          ref={(c) => {
            this.searchResultRef = c;
          }}
        >
          <div
            ref={(c) => {
              this.searchResultWrapRef = c;
            }}
          >
            {searchResultElement}
          </div>
        </div>
      </div>
    );
  }
}
