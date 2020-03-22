import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
  const [container] = useState(document.createElement(el))

  container.classList.add(className)

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}

Portal.propTypes = {
  el: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
}

export { Portal }
