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
    <main className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <label htmlFor="email">Enter Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

    </main>
  )
}

export default Register