import React, { Component } from 'react'

export default class GameLeaderboard extends Component {
  render () {
    return (
      <div>
        <span onClick={this.props.fetchLeaderBoard}>点击获得排行榜列表</span>
        <ul>
          {
            this.props.leaderboard.map(item => {
              return (
                <li key={item.id}>{item.text}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}