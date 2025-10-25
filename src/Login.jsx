

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Login({ setToken }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const res = await axios.post('https://newstrack-backend-2.onrender.com/api/auth/login', { username, password });
//       const token = res.data.token;
//       localStorage.setItem('token', token);
//       setToken(token);
//       navigate('/news');
//     } catch (err) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <form onSubmit={submit}>
//       <h2>Login</h2>

//       <input
//         placeholder="Username"
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         required
//       />

//       <button type="submit">Login</button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }
















import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('https://newstrack-backend-2.onrender.com/api/auth/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/news');
    } catch (err) {
      setError('Invalid username or password');
      setLoading(false);
    }
  };


  return (
    <form onSubmit={submit}>
      <h2>Login</h2>


      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        disabled={loading}
      />


      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        disabled={loading}
      />


      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-small"></span>
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>


      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
