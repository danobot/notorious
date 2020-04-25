

const config = {}

// Environment setup for React Docker app from:
// https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/


  console.log("Web deployment. .env file config: ", window._env_)

  if (window._env_.DB_URL) {
    config.url = window._env_.DB_URL
    config.username = window._env_.COUCHDB_USER
    config.password = window._env_.COUCHDB_PASSWORD
    config.scheme = window._env_.COUCHDB_SCHEME
  } else {
    console.error("App is not running in electron. DB_URL environment variable containing the full database connection string must be defined on docker container")
  }
export default config
