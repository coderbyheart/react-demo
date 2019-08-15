import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const GRAPHCMS_API = 'https://api-euwest.graphcms.com/v1/cjux3bzbr0bk601f3frvwtu7e/master'
const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
})


ReactDOM.render(
 <ApolloProvider client={client}>
<App />
</ApolloProvider>   
, document.getElementById
('root'));

