import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Library from './pages/Library';
import Collection from './pages/Collection';
import Filters from './components/Filters';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ScholarshipCard from './components/ScholarshipCard';
import ScholarshipForm from './components/ScholarshipForm';
 

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            {/* Because we have the context functionality in place to check a JWT and decode its data, 
            we can use a query that will always find and return the logged in user's data; we need to add a 'me: User' in the typeDefs query */}
            <Route exact path="/me">
              <User />
            </Route>
            <Route exact path="/collection/:userId">
              <Collection />
            </Route>
            <Route exact path="/library/:userId">
              <Library />
            </Route>                    
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;
