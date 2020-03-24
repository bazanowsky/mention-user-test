import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SingleArticle } from './singleArticle/singleArticle'

const ArticlesList = ({
  className,
  articles = [],
  onArticleDelete,
  ...props
}) => {
  return (
    <div className={classnames(className, 'articles-list')} {...props}>
      {articles.map((article) => (
        <SingleArticle
          key={article.id}
          className={'articles-list__item'}
          article={article}
          onArticleDelete={onArticleDelete}
        />
      ))}
    </div>
  )
}

ArticlesList.propTypes = {
  className: PropTypes.string,
  articles: PropTypes.array,
  onArticleDelete: PropTypes.func,
}

export { ArticlesList }
