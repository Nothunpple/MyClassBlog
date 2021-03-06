export default class Component {
  _render (parentElement, props = {}, children = null) {
    this.props = props
    this.props.children = children

    this.elements = {
      parent: parentElement
    }

    if (typeof this.beforeRender === 'function') this.beforeRender(props)

    let tempElements = this.render(props)
    this.renderComponents(tempElements, parentElement)

    if (typeof this.afterRender === 'function') this.afterRender(props)
  }

  renderComponents (elements, parentElement, caller = null) {
    if (typeof elements === 'object') {
      let elementName = elements.elementName
      let props = elements.attributes
      let children = elements.children
      let self = this
      if (caller != null) self = caller

      if (typeof elementName === 'function') {
        let component = new elementName()
        component._render(parentElement, props, children)

        if (props != null && props.ref != null) {
          if (typeof props.ref === 'function') {
            props.ref(component)
          } else if (typeof props.ref === 'string') {
            self.elements[props.ref] = component
          }
        }
      } else {
        let element = document.createElement(elementName)
        Object.assign(element, props)
        parentElement.appendChild(element)

        if (props != null && props.ref != null) {
          if (typeof props.ref === 'function') {
            props.ref(element)
          } else if (typeof props.ref === 'string') {
            self.elements[props.ref] = element
          }

          if (typeof props.onClick === 'function') element.addEventListener('click', props.onClick)

          if (typeof props.onMouseDown === 'function') element.addEventListener('mousedown', props.onMouseDown)
          if (typeof props.onMouseEnter === 'function') element.addEventListener('mouseenter', props.onMouseEnter)
          if (typeof props.onMouseLeave === 'function') element.addEventListener('mouseleave', props.onMouseLeave)

          if (typeof props.onTouchStart === 'function') element.addEventListener('touchstart', props.onTouchStart)
          if (typeof props.onTouchEnd === 'function') element.addEventListener('touchend', props.onTouchEnd)
          if (typeof props.onTouchCancel === 'function') element.addEventListener('touchcancel', props.onTouchCancel)
          if (typeof props.onTouchMove === 'function') element.addEventListener('touchmove', props.onTouchMove)

          if (typeof props.onFocus === 'function') element.addEventListener('focus', props.onFocus)
          if (typeof props.onBlur === 'function') element.addEventListener('blur', props.onBlur)
          if (typeof props.onInput === 'function') element.addEventListener('input', props.onInput)
          if (typeof props.onChange === 'function') element.addEventListener('change', props.onChange)

          if (typeof props.style === 'object') {
            Object.assign(element.style, props.style)
          }

          for (var key in this.defaultProps) {
            if (props[key] === null) {
              props[key] = this.defaultProps[key]
            }
          }
        }

        if (children != null) {
          let childrenToMove = []
          let childrenIndex = 0

          let x = children.length
          while (x--) {
            if (typeof children[x] !== 'string' && children[x].length > 0) {
              childrenToMove = children[x]
              childrenIndex = x
              children.splice(x, 1)
            }
          }

          for (x = childrenToMove.length - 1; x >= 0; x--) {
            if (typeof childrenToMove[x] !== 'string') {
              childrenToMove[x].isPropChild = true
            }

            children.splice(childrenIndex, 0, childrenToMove[x])
          }

          for (var i = 0; i < children.length; i++) {
            if (children[i].isPropChild) {
              this.renderComponents(children[i], element, this)
            } else {
              this.renderComponents(children[i], element)
            }
          }
        }
      }
    } else if (typeof elements === 'string') {
      parentElement.innerHTML += elements
    }
  }
}
