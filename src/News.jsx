

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function News({ token }) {
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     setError('');
//     try {
//       const res = await axios.get('https://newstrack-backend-2.onrender.com/api/news', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setArticles(res.data);
//     } catch (err) {
//       setError('Failed to fetch news');
//     }
//   };

//   const addToHistory = async (article) => {
//     try {
//       await axios.post('https://newstrack-backend-2.onrender.com/api/history/add', article, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert('Added to history');
//     } catch {
//       alert('Failed to add to history');
//     }
//   };


// return (
//   <div>
//     <h2 style={{ maxWidth: 900, margin: '20px auto' }}>Latest News</h2>
//     {error && <p style={{ color: 'red', maxWidth: 900, margin: 'auto' }}>{error}</p>}
//     {articles.length === 0 && !error && <p style={{ maxWidth: 900, margin: 'auto' }}>Loading...</p>}

//     <div className="articles-grid">
//       {articles.map((article, idx) => (
//         <div key={idx} className="article-card">
//           <h3 title={article.title}>{article.title}</h3>
//           {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
//           <p title={article.description}>{article.description}</p>
//           <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
//           <button onClick={() => addToHistory(article)}>Add to History</button>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// }









import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function News({ token }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchNews();
  }, []);


  const fetchNews = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get('https://newstrack-backend-2.onrender.com/api/news', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArticles(res.data);
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };


  const addToHistory = async (article) => {
    try {
      await axios.post('https://newstrack-backend-2.onrender.com/api/history/add', article, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Added to history');
    } catch {
      alert('Failed to add to history');
    }
  };


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading latest news...</p>
      </div>
    );
  }


  return (
    <div>
      <h2 style={{ maxWidth: 900, margin: '20px auto' }}>Latest News</h2>
      {error && <p style={{ color: 'red', maxWidth: 900, margin: 'auto' }}>{error}</p>}
      {articles.length === 0 && !error && <p style={{ maxWidth: 900, margin: 'auto' }}>No articles found.</p>}


      <div className="articles-grid">
        {articles.map((article, idx) => (
          <div key={idx} className="article-card">
            <h3 title={article.title}>{article.title}</h3>
            {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
            <p title={article.description}>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
            <button onClick={() => addToHistory(article)}>Add to History</button>
          </div>
        ))}
      </div>
    </div>
  );
}
