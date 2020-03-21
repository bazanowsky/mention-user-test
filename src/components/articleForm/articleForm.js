import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from '../button/button';
import {v4 as uuid} from 'uuid';

const FIELD_NAMES = {
  CONTENT: 'content'
}

const ArticleForm = ({className, onSubmit, ...props}) => {
  const handleSubmit = useCallback(e => {
    e.preventDefault()
    const now = new Date();
    const article = {
      id: uuid(),
      author: 'Sample name',
      title: 'Sample title',
      content: e.target[FIELD_NAMES.CONTENT].value,
      createdAt: now,
      updatedAt: now,
    }
    onSubmit(article)
    e.target.reset()
    },
  [onSubmit])

  return (
    <form className={classnames(className, 'article-form')} onSubmit={handleSubmit} {...props}>
      <h3>Article form</h3>
      <textarea name={FIELD_NAMES.CONTENT} className="article-form__content" />
      <Button type="submit">Add article</Button>
    </form>
  )
}

ArticleForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export { ArticleForm }
