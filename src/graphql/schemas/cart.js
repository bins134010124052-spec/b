const gql = String.raw;

const cartSchema = gql`
  type CartItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Cart {
    id: ID!
    user: User!
    items: [CartItem!]!
    totalPrice: Float!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    cart: Cart
  }

  extend type Mutation {
    addToCart(productId: String!, quantity: Int!): Cart!
    updateCartItem(productId: String!, quantity: Int!): Cart!
    removeFromCart(productId: String!): Cart!
    clearCart: Cart!
  }
`;

module.exports = cartSchema;
