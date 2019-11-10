import { connect } from 'react-redux'
import { addNumber, subtractNumber, multiplyNumber } from '../actions'
import Caculation from '../components/Caculation'

const mapStateToProps = state => ({
  caculate: state.caculate
})

const mapDispatchToProps = dispatch => ({
  plus: number => dispatch(addNumber(number)),
  subtract: number => dispatch(subtractNumber(number)),
  multiply: number => dispatch(multiplyNumber(number))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caculation)
