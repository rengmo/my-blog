import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Caculate from './containers/Caculate'
import Leaderboard from './containers/Leaderboard'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Caculate/>
        <Leaderboard />
      </Provider>
    )
  }
}