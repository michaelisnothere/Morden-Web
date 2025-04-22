import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../shared/styles.css';

const Images = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [search, setSearch] = useState('')

  const fetchPictures = async (params = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://pixabay.com/api/?key=${import.meta.env.VITE_PX_API}&q=${params}&image_type=photo&per_page=20&order=popular&safesearch=true`
      );
      const data = await res.json();
      setPictures(data.hits || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNature = async () => {
    await fetchPictures("nature");
  };
  const fetchCity = async () => {
    await fetchPictures("city");
  };
  const fetchAnimal = async () => {
    await fetchPictures("animal");
  };

  const handleSearch = async () => {
    try{
    if (!search) {
      alert("Please enter a search term.");
      return;
    }
    setLoading(true)
    await fetchPictures(search);
   }catch(err) {
    console.log('err searching' , err)
   } finally {
    setLoading(false)
    setSearch('')
   }
  };

  const fetchPopular = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://pixabay.com/api/?key=${import.meta.env.VITE_PX_API}&image_type=photo&per_page=20&order=popular&safesearch=true`
      );
      const data = await res.json();
      setPictures(data.hits || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const upVideos = () => {
    navigate("/upload");
  };

  useEffect(() => {
    fetchPictures();
  }, []);


  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">      
      <div className="content-header">
        <h1>Feeling artsy or curious? Take a look at these</h1>
        <div className="cat-menu">
          <ul>
            <li>
              <input type="text" 
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}></input>
              <li onClick={() => handleSearch(search)}>Search</li>
            </li>
            <li onClick={fetchPopular}>Popular</li>
            <li onClick={fetchNature}>Nature</li>
            <li onClick={fetchCity}>City Landscapes</li>
            <li onClick={fetchAnimal}>Animals</li>
            {isLoggedIn && <li onClick={upVideos}>Upload Article</li>}
          </ul>
        </div>
      </div>
      <div className="media">
        {pictures.map((picture) => (
          <div key={picture.id} className="media-card">
            <Link to={`/image-details/${picture.id}`} state={{ picture }}>
            <img
              src={picture.webformatURL}
              alt={picture.tags}
            />
            </Link>
            <p>Tags: {picture.tags}</p>
            <p>User: {picture.user}</p>
            <p>Views: {picture.views}</p>
            <p>Likes: {picture.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Images;
