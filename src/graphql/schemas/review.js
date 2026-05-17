const gql = String.raw;

const reviewSchema = gql`
  type Review {
    id: ID!
    product: Product!
    user: User!
    rating: Int!
    comment: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    productReviews(productId: String!): [Review!]!
  }

  extend type Mutation {
    createReview(productId: String!, rating: Int!, comment: String!): Review!
  }
`;

module.exports = reviewSchema;
