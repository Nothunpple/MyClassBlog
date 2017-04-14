import React from 'react'

export default class NavigationDrawer extends React.Component {
  constructor () {
    super()

    this.state = {
      left: -240,
      width: 240,
      height: '100%',
      darkOpacity: 0,
      darkVisible: false,
      persistent: true,
      toggled: false
    }
  }

  componentDidMount () {
    const self = this
    // Add on window resize event listener.
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768 && self.state.persistent && self.state.toggled) {
        self.showTemporary()
      }
      if (window.innerWidth > 768 && !self.state.persistent && self.state.toggled) {
        self.hideDark()
        self.showPersistent()
      }
    })
  }

  /**
   * Show navigation drawer.
   */
  show = () => {
    // If window width is less than 768, then show temporary navigation drawer.
    if (window.innerWidth <= 768) this.showTemporary()
    // Otherwise show persistent navigation drawer.
    else this.showPersistent()
  }

  /**
   * Hide navigation drawer.
   */
  hide = () => {
    // If window width is more than 768, then hide temporary navigation drawer.
    if (window.innerWidth <= 768) this.hideTemporary()
    // Otherwise hide persistent navigation drawer.
    else this.hidePersistent()
  }

  /**
   * Shows persistent navigation drawer.
   */
  showPersistent = () => {
    var app = this.props.getApp()

    // Change left and width.
    this.setState({
      left: 0,
      width: this.props.persistentWidth
    })

    // Change app's content width.
    app.setState({
      contentWidth: 'calc(100% - ' + this.props.persistentWidth + 'px)'
    })

    this.setState({persistent: true, toggled: true})
  }

  /**
   * Hides persistent navigation drawer.
   */
  hidePersistent = () => {
    var app = this.props.getApp()

    // Change navigation drawer's left.
    this.setState({
      left: -this.props.persistentWidth
    })

    // Change app's content width
    app.setState({
      contentWidth: '100%'
    })

    this.setState({toggled: false})
  }

  /**
   * Shows temporary navigation drawer.
   */
  showTemporary = () => {
    var app = this.props.getApp()

    // Show dark background.
    this.showDark()

    // Change navigation drawer's left and width.
    this.setState({
      left: 0,
      width: this.props.temporaryWidth
    })

    // Change app's content width.
    app.setState({
      contentWidth: '100%'
    })

    this.setState({persistent: false, toggled: true})
  }

  /**
   * Hides temporary navigation drawer.
   */
  hideTemporary = () => {
    // Hide dark background.
    this.hideDark()

    // Change navigation drawer's left.
    this.setState({
      left: -this.props.temporaryWidth
    })

    this.setState({toggled: false})
  }

  /**
   * Shows dark and fullscreen background.
   */
  showDark = () => {
    this.setState({
      darkOpacity: this.props.darkOpacity,
      darkVisible: true
    })
  }

  /**
   * Hides dark and fullscreen background.
   */
  hideDark = () => {
    var self = this

    // Animate dark background opacity.
    this.setState({
      darkOpacity: 0
    })

    // Wait until the animation end (300 milliseconds).
    setTimeout(function () {
      self.setState({
        darkVisible: false
      })
    }, 300)
  }

  render () {
    var navigationDrawerStyle = {
      backgroundColor: this.props.backgroundColor,
      width: this.state.width,
      height: this.state.height,
      left: this.state.left,
      borderRight: (this.state.persistent && this.state.toggled) ? '1px solid rgba(0,0,0,0.12)' : 'none'
    }
    var darkStyle = {
      backgroundColor: this.props.darkBackgroundColor,
      visibility: (this.state.darkVisible) ? 'visible' : 'hidden',
      opacity: this.state.darkOpacity
    }
    var headerStyle = {
      display: (this.state.persistent) ? 'none' : 'block'
    }

    return (
      <div>
        <div className='navigation-drawer' style={navigationDrawerStyle}>
          <div className='navigation-drawer-header' style={headerStyle}>
          </div>
        </div>
        <div className='dark' style={darkStyle} onClick={this.hide} />
      </div>
    )
  }
}

NavigationDrawer.defaultProps = {
  backgroundColor: '#fff',
  persistentWidth: 240,
  temporaryWidth: 260,
  darkBackgroundColor: '#000',
  darkOpacity: 0.7
}
