import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  process.env.CMS_ENDPOINT
)

export default client
