import React from 'react'

export default class Tooltip extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false,
      top: 0,
      left: 0,
      opacity: 0
    }
  }

  /**
    * show tooltip
    * @param {DOMElement} element
    */
  show = (el) => {
    const bounds = el.getBoundingClientRect()
    const left = bounds.left - el.offsetWidth * 0.6
    const top = bounds.top + el.offsetHeight + 10
    this.setState({toogled: true, opacity: 0.8, left: left, top: top})
  }

  /**
    * hide tooltip
    */
  hide = () => {
    const self = this
    this.setState({opacity: 0})
    setTimeout(function () {
      self.setState({toogled: false})
    }, 300)
  }

  /**
    * is visible
    * @return {boolean}
    */
  isToogled = () => {
    return this.state.toggled
  }

  render () {
    const toolTipStyle = {
      opacity: this.state.opacity,
      visibility: (!this.state.toogled) ? 'hidden' : 'visible',
      transition: this.state.transition,
      left: this.state.left,
      top: this.state.top
    }
    return (
      <div className='tooltip' style={toolTipStyle}>
        {this.props.children}
      </div>
    )
  }
}
