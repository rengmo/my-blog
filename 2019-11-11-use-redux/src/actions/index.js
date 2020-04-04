import fetch from 'cross-fetch'

export const ADD_NUMBER = 'ADD_NUMBER'
export const SUBTRACT_NUMBER = 'SUBTRACT_NUMBER'
export const MULTIPLY_NUMBER = 'MULTIPLY_NUMBER'

export const REQUEST_LEADERBOARD = 'REQUEST_LEADERBOARD'
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD'

export const addNumber = number => ({
  type: ADD_NUMBER,
  number
})

export const subtractNumber = number => ({
  type: SUBTRACT_NUMBER,
  number
})

export const multiplyNumber = number => ({
  type: MULTIPLY_NUMBER,
  number
})

// 异步请求排行榜信息
const requestLeaderBoard = () => ({
  type: REQUEST_LEADERBOARD
})

const receiveLeaderBoard = (json) => ({
  type: RECEIVE_LEADERBOARD,
  leaderboard: json
})

export function fetchLeaderBoard () {
  return dispatch => {
    dispatch(requestLeaderBoard())
    return fetch(`http://localhost:3000/testData.json`)
      .then(res => res.json())
      .then(json => dispatch(receiveLeaderBoard(json)))
  }
}
