import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BlogDetails from './components/BLog/BlogDetails';
import BlogList from './components/BLog/BlogList';
import CreateBlog from './components/BLog/CreateBlog';
import Navigation from './components/Navigation/Navigation';
import { GlobalProvider } from './context/globalProvider';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <GlobalProvider>
          <Navigation />
          <div className="main-container">
            <Container>
              <div>
                <Switch>
                  <Route path="/createBlog" exact component={CreateBlog} />
                  <Route path="/blog/:id" exact component={BlogDetails} />
                  <Route path="/" component={BlogList} />
                </Switch>
              </div>
            </Container>
          </div>
        </GlobalProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
