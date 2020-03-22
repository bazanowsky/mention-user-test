import React from 'react'
import { Portal } from '../portal/portal'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { isNil } from 'lodash/lang'

const MentionSuggestList = ({ input, position, className }) => {
  if (isNil(input)) {
    return null
  }

  const { top, left } = position

  return (
    <div
      className={classnames(className, 'mention-suggest-list')}
      style={{ top, left }}
    >
      <span>Input: {input}</span>
    </div>
  )
}

const MentionSuggestListPortal = ({ portalProps = {}, ...props }) => {
  return (
    <Portal
      {...portalProps}
      className={classnames(portalProps.className, 'suggestions-root')}
    >
      <MentionSuggestList {...props} />
    </Portal>
  )
}

MentionSuggestList.propTypes = {
  input: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
}

MentionSuggestListPortal.propTypes = {
  ...MentionSuggestList.propTypes,
  portalProps: PropTypes.object,
}

export { MentionSuggestList, MentionSuggestListPortal }
