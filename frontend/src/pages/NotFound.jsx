import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found.</p>
      <Link to="/login" className="btn btn-primary">Go to Login</Link>
    </main>
  )
}

export default NotFound