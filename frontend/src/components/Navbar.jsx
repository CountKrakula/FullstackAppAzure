import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/AuthService'

const Navbar = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <nav className="navbar bg-base-100 shadow-sm px-6">
      <div className="flex-1 flex gap-4">
        <Link to="/subscriptions" className="btn btn-ghost">Subscriptions</Link>
        <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
      </div>
      <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar