import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import getCaretPosition from 'textarea-caret'

import { MentionSuggestList, MentionSuggestListPortal } from '..'

const EnterKeyCode = 13
const SpaceKeyCode = 32
const EscapeKeyCode = 27

const keyCodesClosingMention = [EnterKeyCode, SpaceKeyCode, EscapeKeyCode]

const MentionInput = ({
  className,
  value,
  onChange,
  disabled = false,
  mentionChar = '@',
  inputProps = {},
  mentionClosingKeyCodes = keyCodesClosingMention,
  ...props
}) => {
  const [currentMention, setCurrentMention] = useState(null)
  const inputRef = useRef()
  const handleKeyUp = useCallback(
    (e) => {
      const { value } = e.target
      if (!currentMention && e.key === mentionChar) {
        const caretPosition = getCaretPosition(
          e.target,
          e.target.selectionStart
        )
        setCurrentMention({
          selectionStart: inputRef.current.selectionStart,
          caretPosition,
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
        const valueFromMention = value.slice(currentMention.selectionStart).split("\n")?.[0]
        const mentionText = valueFromMention.match(/[a-zA-Z0-9_]+/)?.[0] || ''

        setCurrentMention((mention) => ({
          ...mention,
          text: mentionText,
        }))
      }
    },
    [
      currentMention,
      setCurrentMention,
      mentionChar,
      inputRef,
      mentionClosingKeyCodes,
    ]
  )

  return (
    <div className={classnames(className, 'mention-input')} {...props}>
      <textarea
        className="mention-input__textarea"
        onKeyUp={handleKeyUp}
        onBlur={() => {
          setCurrentMention(null)
        }}
        onChange={onChange}
        value={value}
        disabled={disabled}
        ref={inputRef}
        {...inputProps}
      />
      <MentionSuggestList
        input={currentMention?.text}
        position={currentMention?.caretPosition}
      />
    </div>
  )
}

MentionInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  mentionClosingKeyCodes: PropTypes.arrayOf(PropTypes.number),
  Component: PropTypes.elementType,
}

export { MentionInput }
