import { 
  REQUEST_LEADERBOARD, 
  RECEIVE_LEADERBOARD 
} from '../actions'

export default function leaderboard (state = [], action) {
  switch (action.type) {
    case REQUEST_LEADERBOARD:
      return state
    case RECEIVE_LEADERBOARD:
      return action.leaderboard
    default:
      return state
  }
}
