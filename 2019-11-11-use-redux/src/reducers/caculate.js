import { 
  ADD_NUMBER, 
  SUBTRACT_NUMBER, 
  MULTIPLY_NUMBER 
} from '../actions'

export default function caculate (state = 0, action) {
  const { number } = action
  switch (action.type) {
    case ADD_NUMBER:
      return state + number
    case SUBTRACT_NUMBER:
      return state - number
    case MULTIPLY_NUMBER:
      return state * number
    default: 
      return state
  }
}
