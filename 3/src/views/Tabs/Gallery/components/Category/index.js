import React from 'react'

export default class Category extends React.Component {
  componentDidMount () {
    var self = this
    var img = new Image()

    /**
     * On img load event.
     */
    img.onload = function () {
      self.refs.category.style.backgroundImage = 'url(' + this.src + ')'
      if (typeof self.props.onLoad === 'function') self.props.onLoad()
    }

    /**
     * On img error event.
     * @param {Object} error data.
     */
    img.onerror = function (err) {
      console.log('Component: Category')
      if (typeof self.props.onLoad === 'function') self.props.onLoad()
    }

    img.src = this.props.data.pictures[0].url
  }

  /**
   * On mouse down event.
   * @param {Object} event data
   */
  onMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      if (e.target !== this.refs.title && e.target.parentNode !== this.refs.title) {
        var ripple = Ripple.createRipple(this.refs.category, {
          backgroundColor: '#fff',
          opacity: 0.3
        }, createRippleMouse(this.refs.category, e, 1.5))
        Ripple.makeRipple(ripple)
      }
    }
  }

  /**
   * On info mouse down event.
   * @param {Object} event data
   */
  onInfoMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(this.refs.info, {
        backgroundColor: '#000',
        opacity: 0.2
      }, createRippleCenter(this.refs.info, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On info touch start event.
   * @param {object} event data
   */
  onInfoTouchStart = (e) => {
    var ripple = Ripple.createRipple(this.refs.info, {
      backgroundColor: '#000',
      opacity: 0.2
    }, createRippleCenter(this.refs.info, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.props.getApp().blockMouseDownEvent = true
  }

  /**
   * On info mouse enter event.
   * @param {Object} event data
   */
  onInfoMouseEnter = (e) => {
    const app = this.props.getApp()
    const tooltipsData = app.state.tooltipsData
    const tooltip = app.refs.tooltipCategoryInfo

    const info = {
      date: this.props.data.date,
      picturesCount: this.props.data.pictures.length
    }

    tooltipsData.category = info

    app.setState({
      tooltipsData: tooltipsData
    })

    if (!tooltip.state.toggled) tooltip.show(this.refs.info)
  }

  /**
   * On info mouse leave event.
   * @param {Object} event data
   */
  onInfoMouseLeave = (e) => {
    this.props.getApp().refs.tooltipCategoryInfo.hide()
  }

  /**
   * On click event
   * @param {Object} event data
   */
  onClick = (e) => {
    if (e.target !== this.refs.title && e.target !== this.refs.info) {
      this.props.onClick(e, this.props.data)
    }
  }

  /**
   * On touch event (on mobile).
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    if (e.target !== this.refs.title && e.target.parentNode !== this.refs.title) {
      var ripple = Ripple.createRipple(this.refs.category, {
        backgroundColor: '#fff',
        opacity: 0.3
      }, createRippleMouse(this.refs.category, e, 1.5, true))
      Ripple.makeRipple(ripple)
      this.props.getApp().blockMouseDownEvent = true
    }
  }

  render () {
    return (
      <div className='category ripple' ref='category' onMouseDown={this.onMouseDown} onClick={this.onClick} onTouchStart={this.onTouchStart}>
        <div className='category-title' ref='title'>
          {this.props.children}
          <div className='category-info ripple-icon' ref='info' onMouseDown={this.onInfoMouseDown} onMouseEnter={this.onInfoMouseEnter} onMouseLeave={this.onInfoMouseLeave} onTouchStart={this.onInfoTouchStart} />
        </div>
      </div>
    )
  }
}
