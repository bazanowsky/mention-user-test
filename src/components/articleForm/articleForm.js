import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from '../button/button'
import { v4 as uuid } from 'uuid'
import { MentionInput } from '../mentionInput/mentionInput'

const ArticleForm = ({ className, onSubmit, ...props }) => {
  const [content, setContent] = useState('')

  const handleContentChange = useCallback((e) => {
    setContent(e.target.innerHTML)
  }, [])

  const handleSubmit = useCallback(() => {
    const now = new Date()
    const article = {
      id: uuid(),
      author: 'Sample name',
      title: 'Sample title',
      content,
      createdAt: now,
      updatedAt: now,
    }
    onSubmit(article)
    setContent('')
  }, [content, onSubmit])

  return (
    <div className={classnames(className, 'article-form')} {...props}>
      <h3>Article form</h3>
      <MentionInput
        className="article-form__content"
        onChange={handleContentChange}
        content={content}
      />
      <Button type="button" onClick={handleSubmit}>
        Add article
      </Button>
    </div>
  )
}

ArticleForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export { ArticleForm }
