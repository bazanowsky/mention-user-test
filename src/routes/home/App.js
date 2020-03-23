import React, { useCallback, useState } from 'react'
import { ArticleForm, ArticlesList } from '../../components'

function App() {
  const [articles, setArticles] = useState([])

  const addNewArticle = useCallback((article) => {
    setArticles((state) => [article, ...state])
  }, [])

  return (
    <div className="app">
      <div className="app__wrapper">
        <h1 className="app__title">Sample articles system</h1>
        <ArticleForm onSubmit={addNewArticle} />

        <h2 className="app__title">Articles</h2>
        <ArticlesList articles={articles} />
      </div>
    </div>
  )
}

export default App
