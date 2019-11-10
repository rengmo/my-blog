import { connect } from 'react-redux'
import { fetchLeaderBoard } from '../actions'
import GameLeaderboard from '../components/GameLeaderboard'

const mapStateToProps = state => ({
  leaderboard: state.leaderboard
})

const mapDispatchToProps = dispatch => ({
  fetchLeaderBoard: () => dispatch(fetchLeaderBoard())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLeaderboard)