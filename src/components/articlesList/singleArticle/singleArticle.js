import React  from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SingleArticle = ({className, article, ...props}) => {
  return (
    <div className={classnames(className, 'single-article')}>
      Single article

      {Object.entries(article).map(([key, value]) => (
        <div key={key}>{key}: <strong>{String(value)}</strong></div>
      ))}
    </div>
  )
}

SingleArticle.propTypes = {
  className: PropTypes.string,
  article: PropTypes.object,
}

export { SingleArticle }
