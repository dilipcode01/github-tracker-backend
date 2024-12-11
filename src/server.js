import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/repositoryResolver.js';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});