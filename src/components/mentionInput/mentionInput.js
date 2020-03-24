import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import getCaretPosition from 'textarea-caret'

import { MentionSuggestList } from '..'

const EnterKeyCode = 13
const SpaceKeyCode = 32
const EscapeKeyCode = 27

const keyCodesClosingMention = [EnterKeyCode, SpaceKeyCode, EscapeKeyCode]

const calculateListPosition = (caretPosition, element) => {
  const inputRect = element.getBoundingClientRect()
  const inputPaddingBottom = window
    .getComputedStyle(element, null)
    .getPropertyValue('padding-bottom')
    .replace('px', '')
  const inputPaddingRight = window
    .getComputedStyle(element, null)
    .getPropertyValue('padding-right')
    .replace('px', '')
  return {
    top: Math.min.call(
      null,
      inputRect.height - inputPaddingBottom,
      caretPosition.top
    ),
    left: Math.min.call(
      null,
      inputRect.width - inputPaddingRight,
      caretPosition.left
    ),
  }
}

const MentionInput = ({
  className,
  value,
  onChange,
  disabled = false,
  mentionChar = '@',
  inputProps = {},
  mentionClosingKeyCodes = keyCodesClosingMention,
  onMentionSelected,
  ...props
}) => {
  const [currentMention, setCurrentMention] = useState(null)
  const [isSelectingMention, setIsSelectingMention] = useState(false)
  const inputRef = useRef()
  const listRef = useRef()

  const handleKeyUp = (e) => {
    const { value } = e.target
    if (!currentMention && e.key === mentionChar) {
      const caretPosition = getCaretPosition(e.target, e.target.selectionStart)
      const listPosition = calculateListPosition(
        caretPosition,
        inputRef.current
      )
      setCurrentMention({
        selectionStart: inputRef.current.selectionStart,
        listPosition,
        text: '',
      })

      return
    }

    if (
      currentMention &&
      (mentionClosingKeyCodes.includes(e.keyCode) ||
        value.length < currentMention.selectionStart ||
        value[currentMention.selectionStart - 1] !== mentionChar)
    ) {
      setCurrentMention(null)
      return
    }

    if (currentMention && e.key !== mentionChar) {
      const valueFromMention = value
        .slice(currentMention.selectionStart)
        .split('\n')?.[0]
      const mentionText = valueFromMention.match(/[a-zA-Z0-9_]+/)?.[0] || ''

      setCurrentMention((mention) => ({
        ...mention,
        text: mentionText,
      }))
    }
  }

  const handleSuggestionSelect = useCallback(
    (selection) => {
      onMentionSelected(selection)
      const preMentionText = value.slice(0, currentMention.selectionStart)
      const postMentionText = value.slice(
        currentMention.selectionStart + currentMention.text.length
      )
      const newValue = `${preMentionText}${selection.name}${postMentionText} `
      onChange(newValue)
      setCurrentMention(null)
      inputRef.current.focus()
    },
    [value, currentMention, setCurrentMention, onChange]
  )

  return (
    <div className={classnames(className, 'mention-input')} {...props}>
      <textarea
        className="mention-input__textarea"
        onKeyUp={handleKeyUp}
        onBlur={() => {
          if (!isSelectingMention) {
            setCurrentMention(null)
          }
        }}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        value={value}
        disabled={disabled}
        ref={inputRef}
        {...inputProps}
      />
      <MentionSuggestList
        input={currentMention?.text}
        position={currentMention?.listPosition}
        onSelect={handleSuggestionSelect}
        onMouseOver={() => setIsSelectingMention(true)}
        onMouseOut={() => setIsSelectingMention(false)}
        ref={listRef}
      />
    </div>
  )
}

MentionInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onMentionSelected: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  mentionClosingKeyCodes: PropTypes.arrayOf(PropTypes.number),
  Component: PropTypes.elementType,
}

export { MentionInput }
