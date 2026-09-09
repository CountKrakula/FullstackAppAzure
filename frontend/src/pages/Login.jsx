import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {

    e.preventDefault();
    const data = { email, password };
    axios.post('https://localhost:7031/login', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log("Error", err));
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </main>
  )
}

export default Login
