import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './utils/auth';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Library from './pages/Library';
import Collection from './pages/Collection';
import ProvideScholarship from './pages/ProvideScholarship';
import Footer from './components/Footer';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import './assets/css/style.css';
 
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

function capitalize(name){
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  return Name
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          {Auth.loggedIn() ? (
            <Header />
          ) : (
            <>
            <Jumbotron />
            <Header />
            </>
          )}
          <div class="content">
            <div class="container">
              <Route exact path="/">
                {Auth.loggedIn() ? (
                  <span>Welcome back, {capitalize(Auth.getUser().data.username)}!</span>
                ) : (
                  <>
                  </>
                )}
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/collection">
                <Collection />
              </Route>
              {/* TODO scholarshipForm page to be added */}
              <Route exact path="/provideScholarship">
                <ProvideScholarship />
              </Route> 
              <Route exact path="/library">
                <Library />
              </Route>                     
            </div>
          </div>
        </main>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}


export default App;
