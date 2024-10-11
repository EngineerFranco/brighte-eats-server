// src/index.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './types/index.js';
import resolvers from './resolvers/index.js';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
