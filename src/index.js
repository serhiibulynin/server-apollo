

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { mergeTypeDefs } from "@graphql-tools/merge";
import cors from "cors";
import express from "express";
import path from "path";
import dbConfig from "./config/db.js";
import User from "./models/user.js";
import { gql } from "apollo-server";
import logger from 'morgan';
import { startStandaloneServer } from '@apollo/server/standalone';
require('dotenv').config();


const typeDefs = gql`


type Query {
  numberSix: Int! # Should always return the number 6 when queried
  numberSeven: Int! # Should always return 7
}

  type Mutation {
    createUser(name: String!, email: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

const resolvers = {
  Query: {
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const user = await User.create({ name, email });
       return user;
    },
  },
};

async function startApolloServer() {
  const app = express();

  let schema = buildSubgraphSchema({
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers: resolvers,
  });

  const server = new ApolloServer({
    schema, 
    csrfPrevention: false,
  });

  function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }
  
  app.use(cors());
  // app.use(expressMiddleware(server));

  app.use(logger('dev'));

  const port = normalizePort(process.env.PORT || "4000");
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });
  // app.listen({ port }, () =>
  //   console.log(`🚀 Server ready at http://localhost:${port}`),
  // );

  console.log('server', server)
  
  console.log(`🚀  Server ready at: ${url}`);
  console.log('222222', 222222)
  // await server.start();
  
}

startApolloServer();
