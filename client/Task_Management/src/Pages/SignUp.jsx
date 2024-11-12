import React from "react"
import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='flex p-8 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-14'>
        {/* Left Side */}
        <div className='flex-1'>
          <h1 className='py-2 px-4 md:px-8 text-center md:py-4 text-sm bg-[#112F1B] rounded-full cursor-pointer sm:text-4xl font-bold text-[#F5B757]'>
            Chain Task <sup>TM</sup>
          </h1>
          <p className='text-xs mt-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sunt
            voluptatibus repellendus! Quis eos voluptatum ullam nulla odio sunt
            sapiente.
          </p>
        </div>
        {/* Right Side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                className='w-full outline-none border border-[#93A27B] focus:ring-1 focus:ring-[#93A27B] focus:border-[#93A27B] active:border-[#93A27B] py-2.5 px-4 mt-2 rounded'
                placeholder='name@email.com'
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full outline-none border border-[#93A27B] focus:ring-1 focus:ring-[#93A27B] focus:border-[#93A27B] active:border-[#93A27B] py-2.5 px-4 mt-2 rounded'
                placeholder='Password'
                required
              />
            </div>
            <button
              type='submit'
              className='bg-[#112F1B] text-[#F5B757] py-4 cursor-pointer font-bold uppercase tracking-wide rounded-full text-sm'
            >
              Sign Up
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-[#112F1B]'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
