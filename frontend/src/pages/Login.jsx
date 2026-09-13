import '../App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { loginWithCookie } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await loginWithCookie(email, password);
      console.log('Logged in!');
      navigate("/subscriptions");
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" required />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </main>
  )
}

export default Login