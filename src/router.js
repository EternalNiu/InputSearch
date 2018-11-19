/**
 * This module specifies routes of this app
 * @module App/Router
 * @requires react
 * @requires react-router-dom
 * @requires react-loadable
 * @requires {@link module:Speed}
 */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import loadable from 'react-loadable';
import {object} from 'prop-types';

// Dynamically load reducer
import injectAsyncReducer from './injectAsyncReducer';

/**
 * @return {Router}
 */
export default class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  /**
   * Allow dynamic load page component and its affiliated reducers
   * @param  {object} props - Props
   * @param  {object} context - Access store via context
   */
  constructor(props, context) {
    super(props);

    this.DynamicView = loadable({
      loader: () => {
        injectAsyncReducer( // Aynchronously load reducer
          context.store,
          'dynamicView', // Reducer name
          require('./DynamicView/reducer').default // Reducer function
        );

        return import('./DynamicView/container');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });
  }

  /**
   * App router
   * @return {Component} - Router
   */
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <Redirect to="/dynamicView"/>
        )} />
        <Route exact path="/dynamicView" component={this.DynamicView} />
      </div>
    );
  }
}
