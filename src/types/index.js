// src/types/index.js
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [String!]!
  }

  type Query {
    leads: [Lead!]!
    lead(id: ID!): Lead
  }

  type Mutation {
    register(name: String!, email: String!, mobile: String!, postcode: String!, services: [String!]!): Lead!
  }
`;

export default typeDefs;
