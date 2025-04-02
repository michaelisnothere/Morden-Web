import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { newsAPI } from "./config";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //         fetch('http://localhost:8000/articles')
  //         .then((res) => setArticles(res.data))
  //         .catch((err) => console.error("error", err));
  // }, []);

  //stand in for database uploaded articles, newsAPI will be used to simulate user uploads

  const fetchArticles = async (params = "technology") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${params}&apiKey=${newsAPI}`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealth = async () => {
    await fetchArticles("health");
  };
  const fetchEntertain = async () => {
    await fetchArticles("entertainment");
  };
  const fetchBuis = async () => {
    await fetchArticles("business");
  };
  const fetchPopular = async () => {
    await fetchArticles("technology");
  };

  const uploadArticle = () => {
    navigate("/upload");
  };
  useEffect(() => {
    fetchArticles("business");
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="container">
      <h1>Articles Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
          <li>
            <Link to="/pictures">Pictures</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/upload">Upload Post</Link>
          </li>
        </ul>
      </nav>
      <div className="content-section">
        <h2>Articles</h2>
        <div>
          <ul className="category-menu">
            <li>
              <input type="text" placeholder="Search"></input>
            </li>
            <li onClick={fetchPopular}>Popular</li>
            <li onClick={fetchEntertain}>Entertainment</li>
            <li onClick={fetchBuis}>Buisness</li>
            <li onClick={fetchHealth}>Health</li>
            <li onClick={uploadArticle}>Upload Article</li>
          </ul>
        </div>
        <p>This is where text about articles will go</p>
      </div>
      <div className="content-section">
        {articles.map((article) => (
          <div key={article.url} className="article-card">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="article-image"
            />
            <h3>{article.title}</h3>
            <p>{article.author}</p>
            <p>{article.description}</p>
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
