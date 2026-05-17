const gql = String.raw;

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    description: String
    image: String
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    categories: [Category!]!
  }

  extend type Mutation {
    createCategory(name: String!, description: String, image: String): Category!
    updateCategory(id: ID!, name: String, description: String, image: String): Category!
    deleteCategory(id: ID!): Boolean!
  }
`;

module.exports = categorySchema;
