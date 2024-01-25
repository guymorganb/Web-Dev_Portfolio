import { gql } from '@apollo/client';

export const GET_SERVICES = gql`#graphql
  query Services {
    services {
      _id
      title
      description
      price {
        min60
        min90
      }
      image
    }
  }
`;
export const GET_SERVICE_BY_ID = gql`
  query Service($id: ID!) {
    service(id: $id) {
      _id
      title
      description
      price {
        min60
        min90
      }
      image
    }
  }
`;
export const GET_ME = gql` #graphql
  # this is the description of the query
  query me {
    me { # This is a query named 'me'
      _id        # Fetch the unique identifier for the user
      username   # Fetch the username of the user
      email      # Fetch the email address of the user
      # dont ask for a password or you get 400 respone
    }
  }
`;

export const GET_ALL_APPOINTMENTS = gql` #graphql
  # this is the description of the query
  query Appointments {
    appointments {
      _id
      firstName
      lastName
      email
      phone
      date
      massage
      cupping
      contactMethod
      confirm
      rejected
    }
  }
`;

export const GET_UNCONFIRMED_APPOINTMENTS = gql` #graphql
  # this is the description of the query
  query UnconfirmedAppointments($confirm: Boolean!) {
    unconfirmedAppointments(confirm: $confirm) {
      _id
      firstName
      lastName
      email
      phone
      date
      massage
      cupping
      contactMethod
      confirm
      rejected
    }
  }
`;