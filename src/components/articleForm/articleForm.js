import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button } from '../button/button'
import { v4 as uuid } from 'uuid'
import { MentionInput } from '../mentionInput/mentionInput'

const emptyFormData = {
  title: '',
  content: '',
}

const ArticleForm = ({ className, onSubmit, ...props }) => {
  const [formFields, setFormFields] = useState(emptyFormData)
  const [mentionedUsers, setMentionedUsers] = useState({})
  const addMentionedUser = (selection) => {
    setMentionedUsers((users) => ({ ...users, [selection.name]: selection }))
  }
  const handleContentChange = useCallback((value) => {
    setFormFields((state) => ({ ...state, content: value }))
  }, [])

  const handleTextFieldChange = useCallback((e) => {
    const { name, value } = e.target
    setFormFields((state) => ({ ...state, [name]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    const now = new Date()
    const article = {
      id: uuid(),
      ...formFields,
      createdAt: now,
      updatedAt: now,
      mentionedUsers,
    }
    onSubmit(article)
    setFormFields(emptyFormData)
  }, [formFields, onSubmit])

  return (
    <div className={classnames(className, 'article-form')} {...props}>
      <h3>Article form</h3>
      <input
        type="text"
        name="title"
        value={formFields.title}
        onChange={handleTextFieldChange}
        className="article-form__text-input"
        placeholder="Type title here"
      />
      <MentionInput
        className="article-form__content"
        onChange={handleContentChange}
        value={formFields.content}
        onMentionSelected={addMentionedUser}
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
