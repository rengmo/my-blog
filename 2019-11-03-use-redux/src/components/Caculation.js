import React, { Component } from 'react'
import './Caculation.css'

export default class Caculation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plusNumber: 0,
      subtractNumber: 0,
      multiplyNumber: 0,
      operations: [
        {
          id: 1,
          name: '+',
          handler: 'handlePlus',
          inputValueName: 'plusNumber'
        },
        {
          id: 2,
          name: '-',
          handler: 'handleSubtract',
          inputValueName: 'subtractNumber'
        },
        {
          id: 3,
          name: '*',
          handler: 'handleMultiply',
          inputValueName: 'multiplyNumber'
        }
      ]
    }
    this.handlePlus = this.handlePlus.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
    this.handleMultiply = this.handleMultiply.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handlePlus () {
    let value = this.state.plusNumber
    this.props.plus(value)
    this.setState({
      plusNumber: 0
    })
  }
  handleSubtract () {
    let value = this.state.subtractNumber
    this.props.subtract(value)
    this.setState({
      subtractNumber: 0
    })
  }
  handleMultiply () {
    let value = this.state.multiplyNumber
    this.props.multiply(value)
    this.setState({
      multiplyNumber: 0
    })
  }
  handleChange (valName, event) {
    this.setState({
      [valName]: parseInt(event.target.value)
    })
  }
  render () {
    const { caculate: caculateNumber } = this.props
    return (
      <table className="caculate-table">
        <thead>
          <tr>
            <th>初始值</th>
            <th>操作</th>
            <th>结果</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{caculateNumber}</td>
            <td>
              {
                this.state.operations.map(item => {
                  const { id, name, handler, inputValueName } = item
                  return (
                    <div key={id}>
                      <span className="operation-name">{name}</span>
                      <input className="operation-number" type="number" value={this.state[inputValueName]} onChange={this.handleChange.bind(this, inputValueName)}/>
                      <span className="operation-name avaibalbe" onClick={this[handler]}>=</span>
                    </div>
                  )
                })
              }
            </td>
            <td>{caculateNumber}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}