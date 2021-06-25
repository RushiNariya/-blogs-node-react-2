import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setContext } from '@apollo/client/link/context';
import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Login from './components/Login/Login';
import BlogList from './components/Blog/BlogList/BlogList';
import Registration from './components/Registration/Registration';
// import { GlobalProvider } from './context/globalProvider';
import Logout from './components/Logout/Logout';
import BlogDetails from './components/BlogDetails/BlogDetails';
import AddBlog from './components/AddBlog/AddBlog';
import { GlobalContext } from './context/globalProvider';
import MyBlogs from './components/Blog/MyBlogs/MyBlogs';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const localstate = JSON.parse(localStorage.getItem('state'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: localstate.token ? `Bearer ${localstate.token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { token, role } = useContext(GlobalContext);

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        {/* <GlobalProvider> */}
        <Navigation />
        <div className="main-container">
          <Container>
            <div>
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                {token && role === 'Author' ? (
                  <Route path="/myblogs" exact component={MyBlogs} />
                ) : null}
                {token && role === 'Author' ? (
                  <Route path="/addblog" exact component={AddBlog} />
                ) : null}
                <Route path="/registration" exact component={Registration} />
                <Route path="/blog/:id" exact component={BlogDetails} />
                <Route path="/" exact component={BlogList} />
              </Switch>
            </div>
          </Container>
        </div>
        {/* </GlobalProvider> */}
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
