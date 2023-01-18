import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Discover from './pages/Discover';
// import SearchPosts from './pages/SearchPost';
import LikedPost from './pages/LikedPost';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Header from './Components/Header';

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
                    <Header>
                        <NavBar />
                    </Header>
                    <Routes>
                        <Route exact path='/' element={<Discover/>} />
                        <Route exact path='/saved' element={<LikedPost/>} />
                        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                    </Routes>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;
