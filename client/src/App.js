import logo from './logo.svg';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import BookList from './component/BookList';
import AddBook from './component/AddBook';

const client = new ApolloClient({
  uri: 'https://my-nodea.herokuapp.com/graphql',
  // uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="inner">
          <h1>本棚の本</h1>
          <BookList />
          <AddBook />
        </div>
      </div>
    </ApolloProvider>

  );
}

export default App;
