import { gql } from "apollo-server";

export const typeDefs = gql`
  type Repository {
    id: ID!
    name: String!
    description: String
    latestRelease: String
    releaseDate: String
    unseenUpdates: Boolean
  }

  type Query {
    getRepositories: [Repository]
  }

  type Mutation {
    addRepository(url: String!): Repository
    markAsSeen(id: ID!): Boolean
    refreshRepository(id: ID!): Repository
  }
`;