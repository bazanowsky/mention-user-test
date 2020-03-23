import React, { Fragment } from 'react'
import { fromPairs } from 'lodash/array'
import { isString } from 'lodash'

const InjectMentions = ({
  content,
  mentions = {},
  renderMention,
  mentionTag = '@',
  children,
}) => {
  const sortedMentions = Object.entries(mentions).sort(
    (a, b) => b[0].length - a[0].length
  )

  const contentWithMentions = sortedMentions.reduce(
    (content, [key, mention]) => {
      const regex = new RegExp(`\\B${mentionTag}${key}\\b`)
      return content.reduce((prev, part, j) => {
        if (!isString(part)) {
          return prev.concat(part)
        }
        return prev.concat(
          part.split(regex).reduce((prev, current, i) => {
            if (!i) return [current]

            const Component = renderMention(mention, `${key}_${j * i + i}`)
            return prev.concat(Component, current)
          }, [])
        )
      }, [])
    },
    [content]
  )

  return children({ content: contentWithMentions })
}

export { InjectMentions }
