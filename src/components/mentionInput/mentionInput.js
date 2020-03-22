import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const MentionInput = ({
  className,
  value,
  onChange,
  disabled = false,
  ...props
}) => {
  return (
    <textarea
      className={classnames(className, 'mention-input')}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

MentionInput.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  Component: PropTypes.elementType,
}

export { MentionInput }
