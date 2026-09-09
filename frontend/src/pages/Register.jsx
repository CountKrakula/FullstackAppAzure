import React from 'react'

const Register = () => {
  return (
     <main>
            <form>
                <h1>Register</h1>
                <label htmlFor="email">Enter Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Register</button>            
            </form>
                 
        </main>
  )
}

export default Register