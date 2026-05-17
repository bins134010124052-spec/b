const gql = String.raw;

const productSchema = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    category: Category!
    images: [String!]
    rating: Float!
    numReviews: Int!
    createdAt: String!
    updatedAt: String!
  }

  type ProductConnection {
    products: [Product!]!
    total: Int!
    page: Int!
    pages: Int!
  }

  extend type Query {
    products(
      category: String
      minPrice: Float
      maxPrice: Float
      search: String
      page: Int
      limit: Int
    ): ProductConnection!
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Float!
      stock: Int!
      category: String!
      images: [String!]
    ): Product!
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      stock: Int
      images: [String!]
    ): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

module.exports = productSchema;
