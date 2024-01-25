import Nav from '../src/pages/Nav/Nav'
import {UserPreferenceProvider} from './pages/MassageSelector/userContext'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import {Services} from './pages/admin/services'
import Home from './pages/home/home';
import Appointments from './pages/admin/appointments.jsx';
import { setContext } from '@apollo/client/link/context';
import PrivacyPolicy from './pages/admin/privacyPolicy';
import TermsAndConditions from './pages/admin/termAndConditions';
import ProtectedRoutes from './pages/ProtectedRoutes/protectedRoutes';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Reviews from './pages/reviews/reviews';


// Set up an Apollo client to point towards graphql backend
const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql', // GraphQL endpoint
});

// context for JWT
const authLink = setContext((_, { headers }) => {
  // Get token from local storage
  const token = localStorage.getItem('id_token');
  // Return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// httpLink defines where the GraphQL server is hosted. 
// authLink used for setting any headers that need to be attached to your requests.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" index element={<Home />} />
          {/* create Service and booking routed in another route called protected routes */}
        <Route path="/services" element={<ProtectedRoutes element={<Services />} />} />
          {/* Appointments page Route */}
        <Route path="/booking" element={<ProtectedRoutes element={<Appointments />} />} />

          {/* Reviews page Route */}
          <Route path="/reviews" element={<ProtectedRoutes element={<Reviews />} />} />

          {/* Privacy Policy Route */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* Terms of use Route */}
          <Route path="/terms" element={<TermsAndConditions />} />
      </>
      )
    )


    // const router = createBrowserRouter(
    //   createRoutesFromElements(
    //       <Route path="/" element= {<Nav onBookNowClick={scrollToMassageSelector} />}> Home
    //       {/* create Service and booking routed in another route called protected routes */}
    //         <Route index element={<Home />} />
    //         <Route path='/services' element={<Services />} />
    //         {/* Appointments page Route */}
    //         <Route path='/booking' element={<Appointments/>} />
    //         {/* Reviews page Route */}
    //         {/* <Route exact path='/reviews' component={<Services/>} /> */}
    //       </Route>
    //     )
    //   )

  return (
      <GoogleOAuthProvider clientId={`320440515782-44rgq2pmnk3j9in9t1f8g94jjom619vh.apps.googleusercontent.com`}>
      <ApolloProvider client={client}>


        <UserPreferenceProvider>
          <RouterProvider router={router}/>
        </UserPreferenceProvider>


      </ApolloProvider>
      </GoogleOAuthProvider>

  )
}

export default App