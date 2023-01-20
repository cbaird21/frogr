import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Discover from './pages/Discover';
import Profile from './pages/Profile';
// import SearchPosts from './pages/SearchPost';
import LikedPost from './pages/LikedPost';
import Footer from './components/footer/index';
import Header from './components/header/index';
// import UploadWidget from './components/UploadWidget';

// import { Component } from 'react';
// import './App.css';

// import Weavy from './weavy/Weavy';
// import WeavyApp from './weavy/WeavyApp';

// export default class App extends Component {
//     async getJwt() {
//         return '[Provide your JWT here]';
//     }

//     render() {
//         return (
//             <Weavy jwt={this.getJwt}>
//                 <div className="App">
//                     <WeavyApp
//                         spaceKey="react-space"
//                         spaceName="React Space"
//                         appKey="react-files"
//                         appName="React Files"
//                         appType="files"
//                     />
//                 </div>
//             </Weavy>
//         );
//     }
// }


// this sends graphql operations to our remote endpoint, it might be what we were missing?
const httpLink = createHttpLink({
    uri: '/graphql'
})

// create link with context to use jwt and pass to apollo
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            // this might solve the token problem
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// using the apollo client with the created http link
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    
    // making app window responsive
    const [width, setWindowWidth] = useState(0)
    useEffect(() => { 

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => 
        window.removeEventListener('resize',updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

    return (
        <ApolloProvider client={client}>
            <Router>
                <>
                    <Header />
                    <Routes>
                        <Route exact path='/' element={<Discover />} />
                        <Route exact path='/saved' element={<LikedPost />} />
                        <Route exact path="/profile" element={< Profile />} />
                        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                    </Routes>
                    <Footer />
                </>
            </Router>
        </ApolloProvider>
    );
}

export default App;
