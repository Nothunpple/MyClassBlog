import MultiIcon from './components/MultiIcon'
import SearchIcon from './components/SearchIcon'

export default class Toolbar {
  constructor () {
    this.touched = false
    this.items = []
    this.hiddenItems = []

    this.elements = {}

    this.actionIconRippleStyle = {
      backgroundColor: '#000',
      opacity: 0.2
    }

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On item mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onItemMouseDown = (e) => {
    if (!this.touched) {
      const target = e.target

      let ripple = Ripple.createRipple(target, this.actionIconRippleStyle, createRippleCenter(target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On item touch start event.
   * Makes ripple.
   * @param {Event}
   */
  onItemTouchStart = (e) => {
    const target = e.target

    let ripple = Ripple.createRipple(target, this.actionIconRippleStyle, createRippleCenter(target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * Sets items.
   * @param {Object} items.
   */
  setItems = (items) => {
    let first = true
    let hasLeftIcon = false
    let left = 16

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const type = item.type
      const subType = item.subType
      const position = item.position
      let style = item.style
      const image = item.image

      if (type === 'Icon') {
        if (image && subType !== 'Menu' && subType !== 'Search') {
          style = Object.assign(
            {
              backgroundImage: 'url(' + image + ')'
            }, style
          )
        }

        let className = 'toolbar-icon ripple-icon toolbar-' + position.toLowerCase()

        if (first) {
          if (position === 'Right') {
            className += ' toolbar-right-first'
          }
        }

        if (position === 'Left') {
          hasLeftIcon = true
        }

        const element = document.createElement('div')
        const id = item.id

        element.className = className
        if (id) element.id = id
        if (style) element.setStyle(style)

        if (subType === 'MultiIcon') {
          this.multiIcon = new MultiIcon()
          const multiIconRoot = this.multiIcon.getRoot()

          element.addEventListener('mousedown', this.onItemMouseDown)
          element.addEventListener('touchstart', this.onItemTouchStart)

          element.appendChild(multiIconRoot)
        } else if (subType === 'Search') {
          element.classList.add('search-icon')

          this.searchIcon = new SearchIcon(element)
          this.searchIcon.getToolbar = this.getToolbar
          const searchIconRoot = this.searchIcon.getRoot()

          element.appendChild(searchIconRoot)
        }

        this.items.push(element)

        this.elements.content.appendChild(element)
      } else if (type === 'Title') {
        if (hasLeftIcon) {
          left = 80
        }

        this.title = document.createElement('div')
        this.title.innerHTML += item.title

        this.title.setAttributes({
          class: 'toolbar-title'
        })

        if (style) this.title.setStyle(style)

        this.items.push(this.title)

        this.elements.content.appendChild(this.title)
      }
    }
  }

  /**
   * Gets toolbar.
   * @return {Toolbar}
   */
  getToolbar = () => {
    return this
  }

  /**
   * Gets mutlti icon.
   * @return {MultiIcon}
   */
  getMultiIcon = () => {
    return this.multiIcon
  }

  /**
   * Hides items.
   * @param {Boolean} hide multi icon.
   * @param {Boolean} hide search icon.
   */
  hideItems = (multiIcon = false, search = true) => {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const id = item.id

      if (multiIcon && id === 'toolbar-icon-multi-icon' || search && id === 'toolbar-icon-search' || id === '') {
        item.style.top = '96px'
        this.hiddenItems.push(item)
      }
    }
  }

  /**
   * Shows hidden items.
   */
  showItems = () => {
    for (let i = 0; i < this.hiddenItems.length; i++) {
      const item = this.hiddenItems[i]
      const top = (!item === this.searchIcon) ? '0px' : '50%'

      item.style.top = top
    }
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.setAttributes({
      class: 'toolbar toolbar-shadow'
    })

    this.elements.content = document.createElement('div')
    this.elements.content.setAttributes({
      class: 'toolbar-content'
    })

    this.elements.root.appendChild(this.elements.content)
  }
}
