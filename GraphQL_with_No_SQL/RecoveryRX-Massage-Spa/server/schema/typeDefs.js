import { gql } from "apollo-server-express";


const typeDefs = gql` #graphql

  type Auth {
    token: String!
    user: User
  }

  type User {
    _id: ID
    username: String!
    email: String!
  }
  
  type Service{
    _id: ID!
    title: String!
    description: String!
    price: [Price!]!
    image: String
  }

  type Price {
    min60: String!
    min90: String!
  }

  type Appointment {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    date: String!
    massage: String!
    cupping: Boolean
    contactMethod: String!
    confirm: Boolean
    rejected: Boolean
    timeWindow: String
  }
  
  type Query {
    services: [Service!]!
    service(id: ID!): Service
    me: User
    appointments: [Appointment]
    unconfirmedAppointments(confirm: Boolean): [Appointment]
  }

  type Mutation {
    addService(title: String!, description: String!, price: [PriceInput!]!, image: String): Service!
    updateService(id: ID!, title: String, description: String, price:[PriceInput!]!, image: String): Service!
    deleteService(id: ID!): Service!
    loginUser(email: String!, password: String!): Auth
    updateAppointment(_id: ID!, confirm: Boolean): Appointment
    deleteAppointment(_id: ID!): Appointment
    addAppointment(
      firstName: String!,
      lastName: String!,
      email: String!,
      phone: String!,
      date: String!,
      massage: String!,
      cupping: Boolean,
      contactMethod: String!,
      timeWindow: String
      ): Appointment
  }
  
  input PriceInput {
        min60: String!
        min90: String!
    }
`;

export default typeDefs;