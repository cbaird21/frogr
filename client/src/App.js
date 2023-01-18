import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Discover from './pages/Discover.js';
import LikedPost from './pages/LikedPost';
import Navbar from './components/Navbar';

//Create an Apollo Provider to make every request work with the Apollo server.
// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

// this sends graphql operations to our remote endpoint, it might be what we were missing?
const httpLink = createHttpLink({
    uri: '/graphql'
})

// create link with context to use jwt and pass to apollo
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            // this might solve the token problem
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// using the apollo client with the created http link
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Discover} />
                        <Route exact path='/saved' component={LikedPost} />
                        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                    </Switch>
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;
