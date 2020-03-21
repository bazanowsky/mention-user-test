import React  from 'react';
import classnames from 'classnames';
import PropTypes  from 'prop-types';

const Button = ({className, Component = 'button', children, ...props}) => {
  return (
    <Component className={classnames(className, 'btn')} {...props}>
      {children}
    </Component>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  Component: PropTypes.elementType,
}

export { Button }
