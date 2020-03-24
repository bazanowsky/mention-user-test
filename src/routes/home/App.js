import React, { useCallback, useEffect, useState } from 'react'
import { ArticleForm, ArticlesList } from '../../components'
import * as localArticles from '../../services/localArticles'

function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const storedArticles = localArticles.getSavedArticles()
    setArticles(storedArticles)
  }, [])

  const addNewArticle = useCallback((article) => {
    localArticles.addArticle(article)
    const storedArticles = localArticles.getSavedArticles()
    setArticles(storedArticles)
  }, [])

  const handleArticleDeleted = useCallback(({ id }) => {
    localArticles.removeArticleById(id)
    const storedArticles = localArticles.getSavedArticles()
    setArticles(storedArticles)
  }, [])

  return (
    <div className="app">
      <div className="app__wrapper">
        <h1 className="app__title">Sample articles system</h1>
        <ArticleForm onSubmit={addNewArticle} />

        <h2 className="app__title">Articles</h2>
        <ArticlesList
          articles={articles}
          onArticleDelete={handleArticleDeleted}
        />
      </div>
    </div>
  )
}

export default App
