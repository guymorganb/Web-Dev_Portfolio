import { gql } from '@apollo/client';

export const ADD_SERVICE = gql`
#add service creates an id
  mutation AddService($title: String!, $description: String!, $min60: String!, $min90: String!, $image: String) {
    addService(title: $title, description: $description, price: [{min60: $min60, min90: $min90}], image: $image) {
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

export const UPDATE_SERVICE = gql`
# description
  mutation UpdateService($id: ID!, $title: String, $description: String, $min60: String!, $min90: String!, $image: String) {
    # call to the updateService resolver with the parameters needed
    updateService(id: $id, title: $title, description: $description, price: [{min60: $min60, min90: $min90}], image: $image) {
      # the structure of the data returned
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

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
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

export const LOGIN_USER = gql`#graphql
# the declaration of a new mutation
  mutation loginUser($email: String!, $password: String!) { # for desciprion purposes
    # loginUser is whats returned to the front end
   
    loginUser(email: $email, password: $password) {  # Now calling the back-end mutation loginUser on the server and passing the variables
      # client is asking for the token feild from the returned Auth Object as defined in the typeDefs
      token
      # client is asking for the nested user field within the Auth object.
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment($_id: ID!, $confirm: Boolean!) {
    updateAppointment(_id: $_id, confirm: $confirm) {
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

export const DELETE_APPOINTMENT = gql`
  mutation DeleteAppointment($_id: ID!) {
    deleteAppointment(_id: $_id) {
      _id
      firstName
      email
      phone
      contactMethod
      date
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $date: String!, $massage: String!, $contactMethod: String!, $cupping: Boolean, $timeWindow: String) {
    addAppointment(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone, date: $date, massage: $massage, contactMethod: $contactMethod, cupping: $cupping, timeWindow: $timeWindow) {
      firstName
      lastName
      email
      phone
      date
      massage
      cupping
      contactMethod
      timeWindow
    }
  }
`;