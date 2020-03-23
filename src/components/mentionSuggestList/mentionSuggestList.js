import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useDebounce } from 'use-debounce'

import { isNil } from 'lodash/lang'
import { api } from '../../services/api'

const MentionSuggestList = forwardRef(
  ({ input, position, onSelect, className, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState({ text: null, results: [] })
    const [isLoading, setLoading] = useState(false)
    const [debouncedInput] = useDebounce(input, 500)
    useEffect(() => {
      if (debouncedInput && debouncedInput !== suggestions.text) {
        api.fetchUsersByPrefix(debouncedInput).then((users) => {
          setLoading(false)
          setSuggestions({ text: debouncedInput, results: users })
        })
      }
      if (!debouncedInput) {
        setSuggestions({ text: debouncedInput, results: [] })
      }
    }, [debouncedInput])

    useEffect(() => {
      setLoading(!!input)
      if (!input) {
        setSuggestions({ text: input, results: [] })
      }
    }, [input])

    const handleItemClick = useCallback(
      (item) => () => {
        onSelect(item)
      },
      [onSelect]
    )
    if (isNil(input)) {
      return null
    }
    const { top, left } = position
    return (
      <div
        className={classnames(className, 'mention-suggest-list', {
          'mention-suggest-list--loading': isLoading,
        })}
        style={{ top, left }}
        ref={ref}
        {...props}
      >
        {!input && (
          <div className="mention-suggest-list__empty">Start typing</div>
        )}
        {isLoading && (
          <div className="mention-suggest-list__loading">Loading</div>
        )}
        {!isLoading &&
          suggestions.results?.map((item) => (
            <div
              key={item.id}
              onClick={handleItemClick(item)}
              className="mention-suggest-list__item"
            >
              {item.name}
            </div>
          ))}
        {!isLoading && input && !suggestions.results?.length && (
          <div className="mention-suggest-list__no-results">
            No users found!
          </div>
        )}
      </div>
    )
  }
)

MentionSuggestList.propTypes = {
  input: PropTypes.string,
  className: PropTypes.string,
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  onSelect: PropTypes.func.isRequired,
}

export { MentionSuggestList }
