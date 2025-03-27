import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
            fetch('http://localhost:8000/articles')
            .then((res) => setArticles(res.data))
            .catch((err) => console.error("error", err));
    }, []);
    return (
        <div className="container">
            <h1>Articles Page</h1>
            <nav>
                <ul>
                    <li><Link to='/'>Home Page</Link></li>
                    <li><Link to='/videos'>Videos</Link></li>
                    <li><Link to='/pictures'>Pictures</Link></li>
                    <li><Link to='/articles'>Articles</Link></li>
                    <li><Link to='/upload'>Upload Post</Link></li>
                </ul>
            </nav>
            <div className="content-section">
                <h2>Articles</h2>
                <div>
                    <ul className="category-menu">
                        <li>
                            <input type='text' placeholder='Search'></input>
                        </li>
                        <li>Popular</li>
                        <li>Trending</li>
                        <li>Recently Uploaded</li>
                        <li>Upload Article</li>
                    </ul>
                </div>
                <p>This is where text about articles will go</p>
            </div>
            <div className="content-section">
                {articles.map((art, index) => (
                    <div key={index} className="item-card">
                        <h3>{art.Title}</h3>
                        <p>thumbnail placeholder</p>
                        <p>{art.Views}</p>
                        <p>{art.DateUpload}</p>
                    </div>
                ))}
            </div>
            <footer>
                <p>Place Holder for imporant links</p>
            </footer>
        </div>
    );
};
export default Articles;