import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Target-URL': 'https://community.fandom.com' },
})

api.fetchUsersByPrefix = async (name) => {
  const { data } = await api.get(
    `api.php?action=query&list=allusers&auprefix=${name}&format=json`
  )
  return data?.query?.allusers
}

export { api }
