import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/AuthService'

const Register = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/login");
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label htmlFor="email">Enter Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>

    </main>
  )
}

export default Register