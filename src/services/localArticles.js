const ARTICLES_STORAGE_KEY = 'articles'

export const getSavedArticles = () => {
  const articlesJSON =
    JSON.parse(window.localStorage.getItem(ARTICLES_STORAGE_KEY)) || []

  return articlesJSON.map((article) => ({
    ...article,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
  }))
}

export const addArticle = (article) => {
  if (!article) {
    return
  }

  const articles = getSavedArticles()
  const newArticles = JSON.stringify([article, ...articles])

  window.localStorage.setItem(ARTICLES_STORAGE_KEY, newArticles)
}

export const removeArticleById = (id) => {
  const articles = getSavedArticles()

  const newArticles = JSON.stringify(
    articles.filter((article) => article.id !== id)
  )

  window.localStorage.setItem(ARTICLES_STORAGE_KEY, newArticles)
}
