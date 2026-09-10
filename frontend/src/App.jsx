import SubscriptionsPage from './pages/SubscriptionsPage'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {


  return (
    <>
      <Routes>
      <Route path="/subscriptions" element={<ProtectedRoute><SubscriptionsPage /></ProtectedRoute>} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
      </Routes>

    </>
  )
}

export default App
