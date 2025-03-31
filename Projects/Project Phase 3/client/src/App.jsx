import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../components/HomePage';
import Videos from '../components/Videos';
import Images from '../components/Images';
import Articles from '../components/Articles';
import Login from '../components/Login';
import Upload from '../components/Upload';
import Register from '../components/Register';
import Profile from '../components/profile';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/pictures" element={<Images />} />
                <Route path="/articles" element={<Articles />} />
                <Route path='/login' element={<Login />} />
                <Route path='/upload' element={<Upload />} />
                <Route path="/register" element={<Register />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;