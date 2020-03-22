import React, { useEffect, useState } from 'react'
import { Portal } from '../portal/portal'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { isNil } from 'lodash/lang'
import { api } from '../../services/api'

const MentionSuggestList = ({ input, position, className }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (input && !isLoading) {
      setLoading(true)
      api.fetchUsersByPrefix(input).then((users) => {
        setLoading(false)
        setSuggestions(users)
      })
    }
    if (!input) {
      setSuggestions([])
    }
  }, [input])

  if (isNil(input)) {
    return null
  }
  const { top, left } = position
  return (
    <div
      className={classnames(className, 'mention-suggest-list', {
        ['mention-suggest-list--loading']: isLoading,
      })}
      style={{ top, left }}
    >
      {!input && (
        <div className="mention-suggest-list__empty">Start typing</div>
      )}
      {isLoading && (
        <div className="mention-suggest-list__loading">Loading</div>
      )}
      {suggestions?.map((item) => (
        <div key={item.id} className="mention-suggest-list__item">
          {item.name}
        </div>
      ))}
      {input && !suggestions.length && (
        <div className="mention-suggest-list__no-results">No users found!</div>
      )}
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
