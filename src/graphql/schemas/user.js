const gql = String.raw;

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    profilePicture: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
    users: [User!]!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(name: String, profilePicture: String): User!
  }
`;

module.exports = userSchema;
