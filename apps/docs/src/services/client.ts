import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_CMS_ENDPOINT ?? 'localhost:3000'}`)

export default client
