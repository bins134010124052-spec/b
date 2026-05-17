const gql = String.raw;

const orderSchema = gql`
  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]!
    totalPrice: Float!
    status: String!
    shippingAddress: String!
    phone: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    orders: [Order!]!
    order(id: ID!): Order
  }

  extend type Mutation {
    createOrder(shippingAddress: String!, phone: String!): Order!
    updateOrderStatus(id: ID!, status: String!): Order!
  }
`;

module.exports = orderSchema;
