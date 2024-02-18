const getAPIURL = () => {
  return import.meta.env.MODE === 'development'
    ? ''
    : 'https://boardy-backend.vercel.app'
}

export default getAPIURL