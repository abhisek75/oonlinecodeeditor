import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options:{
                username:username
            }
        })

        if (error) {
            setError(error.message)
            toast.error(error.message)
            console.log(error)
        } else {
            console.log('User registered:', data.user)
            toast.success('User registration successfully ')
            navigate('/login')
        }
    }

    return (
        <div>

            <div className="text-center mt-24">
                <div className="flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-4xl tracking-tight">
                    Register Your Account
                </h2>
                <span className="text-sm">or <a href="/login" className="text-blue-500">
                    Login
                </a></span>
            </div>
            <div className="flex justify-center my-2 mx-4 md:mx-0">
                <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6" onSubmit={handleSignUp}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='email'>Username</label>
                            <input
                                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type='text'
                                id='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='email'>Email address</label>
                            <input
                                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='password'>Password</label>
                            <input
                                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="w-full md:w-full px-3 mb-6 text-red-500">{error}</div>}
                        <div className="w-full flex items-center justify-between px-3 mb-3 ">
                            <label htmlFor="remember" className="flex items-center w-1/2">
                                <input type="checkbox" name="" id="remember" className="mr-1 bg-white shadow" />
                                <span className="text-sm text-gray-700 pt-1">Remember Me</span>
                            </label>
                            <div className="w-1/2 text-right">
                                <a href="#" className="text-blue-500 text-sm tracking-tight">Forget your password?</a>
                            </div>
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <button
                                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                                type="submit"
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
