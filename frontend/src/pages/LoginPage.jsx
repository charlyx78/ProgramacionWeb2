import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useUser } from '../contexts/UserContext'

export const LoginPage = () => {
  const { loginUser, getUser } = useUser()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Redirige a Home si ya hay una sesion iniciada
  useEffect(() => {
    if (getUser()) {
      navigate('/Feed')
    }
  }, [getUser, navigate])

  // Funcion para el login con la base de datos
  const handleLogin = () => {
    if (username !== '' && password !== '') {
      fetch(`http://localhost:3000/users?userName=${username}`).then((res) => {
        if (!res) {
          throw new Error(res)
        }
        return res.json()
      }).then((users) => {
        // Toma el primer (unico) resultado de la respuesta
        const user = users[0]
        if (!user) {
          toast.error('Please enter a valid username')
        } else if (user.password === password) {
          loginUser(user)
          toast.success('Logged successfully')
          navigate('/feed')
        } else {
          toast.error('Please enter valid credentials')
        }
      }).catch((err) => {
        toast.error(`Login failed due to: ${err.message}`)
      })
    } else {
      toast.error('Type a username and a password to continue')
    }
  }

  const handleGoogleLogin = () => {
    alert('Patience. This function will be enable soon :)')
  }

  return (
    <main className='login-container'>

      <aside className='login-background-container'>
        <div className='login-background-content'>
          <h1 className='text-light m-0'>Trendingverse</h1>
          <h2 className='text-light mb-0'>Stay ahead, stay informed</h2>
          <p className='text-light m-0'>Developed by Team 2 for the PW2 assignment</p>
          <ul className='d-flex gap-2 m-0'>
            <li><a className='text-light' href='https://github.com/charlyx78'>charlyx78</a></li>
            <li><a className='text-light' href='https://github.com/nokrets'>nokrets</a></li>
            <li><a className='text-light' href='https://github.com/EdgarPalmaJr'>EdgarPalmaJr</a></li>
          </ul>
          <p className='text-light'>&copy; 2024 All Rights Reserved</p>
        </div>
      </aside>

      <div className='login-content'>
        <h1 className='logo text-primary fs-3 d-lg-none'>Trendingverse</h1>
        <h3 className='fw-bold mb-3 text-start fs-2'>Hi, Welcome Back!👋</h3>
        <div className='d-flex flex-column w-100 gap-4'>
          <div className='form-field'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' onChange={(e) => { setUsername(e.target.value) }} className='form-control' placeholder='Username' />
          </div>
          <div className='form-field mb-3'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={(e) => { setPassword(e.target.value) }} className='form-control' placeholder='Password' />
          </div>
          <div className='login-content-buttons'>
            <button className='btn btn-primary w-100' onClick={handleLogin}>Login</button>
            <button className='btn btn-outline-dark w-100' onClick={handleGoogleLogin}>Continue with Google</button>
          </div>
        </div>
        <div className='d-flex'>
          <p className='m-0'>
                      You don&apos;t have an account?
          </p>
          <NavLink
            to='/Signup'
            className='ms-2 text-primary'
          >
            Sign up
          </NavLink>
        </div>
      </div>
      
    </main>
  )
}
