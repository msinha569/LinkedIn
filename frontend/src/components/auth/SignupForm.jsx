import React from 'react'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { useAuth } from '../../services/useAuth.jsx';
const SignupForm = () => {
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const {signupMutation, signupLoading: isLoading} = useAuth()

    const handleSignUp = (e) => {
        
        e.preventDefault()
        signupMutation({name, email, username, password})
    }

  return (
      <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
			<input
				type='text'
				placeholder='Full name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Password (6+ characters)'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full'
				required
			/>

			<button type='submit' disabled={isLoading} className='btn btn-primary w-full text-white'>Agree & Join
			</button>
		</form>
  )
}

export default SignupForm
