import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { format } from 'date-fns'

import { InjectMentions } from '../../injectMentions/injectMentions'
import { isString } from 'lodash/lang'

const SingleArticle = ({ className, onArticleDelete, article, ...props }) => {
  return (
    <article className={classnames(className, 'single-article')}>
      <header className="single-article__header">
        <h2 className="single-article__title">{article.title}</h2>
        <time
          className="single-article__date"
          dateTime={article.createdAt.toISOString()}
        >
          {format(article.createdAt, 'HH:mm dd.MM.yyyy ')}
        </time>
        <span
          className="single-article__delete"
          onClick={() => onArticleDelete(article)}
        >
          Delete
        </span>
      </header>
      <div className="single-article__content">
        <InjectMentions
          content={article.content}
          mentions={article.mentionedUsers}
          renderMention={(mention, key) => (
            <span key={key} className="mention" title={mention.id}>
              {mention.name}
            </span>
          )}
        >
          {({ content }) =>
            content.map((item) => {
              if (!isString(item)) {
                return item
              }

              return item.split('\n').map((item, key) => (
                <Fragment key={key}>
                  {item}
                  {!!key && <br />}
                </Fragment>
              ))
            })
          }
        </InjectMentions>
      </div>
    </article>
  )
}

SingleArticle.propTypes = {
  className: PropTypes.string,
  article: PropTypes.object,
  onArticleDelete: PropTypes.func,
}

export { SingleArticle }
