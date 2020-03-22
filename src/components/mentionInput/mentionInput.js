import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

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
        setCurrentMention({
          selectionStart: inputRef.current.selectionStart,
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
        const valueFromMention = value.slice(currentMention.selectionStart)
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

  useEffect(() => {
    console.log(currentMention)
  }, [currentMention])

  return (
    <div className={classnames(className, 'mention-input')} {...props}>
      <textarea
        className="mention-input__textarea"
        onKeyUp={handleKeyUp}
        onChange={onChange}
        value={value}
        disabled={disabled}
        ref={inputRef}
        {...inputProps}
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
