/**
 * App entry point
 * @module App/App
 */
import React from 'react';
import Router from './router';

const App = () => (
  <Router key={Math.random()} />
);
export default App;
