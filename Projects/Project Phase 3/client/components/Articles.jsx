import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../shared/styles.css';


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [search, setSearch] = useState('')

  const fetchArticles = async (params = "technology") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${params}&apiKey=${import.meta.env.VITE_NEWS_API}`
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
  const handleSearch = async (search) => {
    try{
      if (!search) {
        alert("Please enter a search term.");
        return;
      }
      setLoading(true)
      const res = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${import.meta.env.VITE_NEWS_API}`)
      const data  = await res.json()
      setArticles(data.articles || []);
    } catch (err){
      console.log('Error searching', err)
    } finally {
      setLoading(false)
      setSearch('')
    }
  }

  const uploadArticle = () => {
    navigate("/upload");
  };
  useEffect(() => {
    fetchArticles("business");
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="container">
      <div className="content-header">
        <h1>Want something with more substance?</h1>
      <div>
          <ul className="cat-menu">
            <li>
              <input type="text" placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}/>
              <button onClick={() => handleSearch(search)}>Search</button>
            </li>
            <li onClick={fetchPopular}>Popular</li>
            <li onClick={fetchEntertain}>Entertainment</li>
            <li onClick={fetchBuis}>Buisness</li>
            <li onClick={fetchHealth}>Health</li>
            {isLoggedIn && <li onClick={uploadArticle}>Upload Article</li>}
          </ul>
        </div>
      </div>
      <div className="media">
        {articles.map((article) => (
          <div key={article.url} className="media-card">
          <Link to='/article-details' state={{ article }}> 
            <img
              src={article.urlToImage}
              alt={article.title}
            />
            </Link>
            <h3>{article.title}</h3>
            <p>{article.author}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Articles;
