import { ApolloClient, InMemoryCache } from '@apollo/client';

const cmsClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_CMS_ENDPOINT,
  cache: new InMemoryCache(),
});

export default cmsClient;
