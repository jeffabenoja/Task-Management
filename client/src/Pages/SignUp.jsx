import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Spinner from "../components/Spinner"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import api from "../controller/services/api"

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const SignUp = () => {
  const [newUser, { isLoading, error }] = api.useNewUserMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData) => {
    try {
      const response = await newUser(formData).unwrap()
      if (response.success) {
        navigate("/sign-in")
      }
    } catch (error) {
      console.log(error.data.message)
    }
  }

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
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor='firstname'>First Name</label>
              <input
                type='text'
                {...register("firstname")}
                className='w-full outline-none border text-secondary-200 border-[#93A27B] focus:ring-1 focus:ring-[#93A27B] focus:border-[#93A27B] active:border-[#93A27B] py-2.5 px-4 mt-2 rounded'
                placeholder='First Name'
              />
              {errors.firstname && (
                <p className='text-red-500'>{errors.firstname.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='lastname'>Last Name</label>
              <input
                type='text'
                {...register("lastname")}
                className='w-full outline-none border text-secondary-200 border-[#93A27B] focus:ring-1 focus:ring-[#93A27B] focus:border-[#93A27B] active:border-[#93A27B] py-2.5 px-4 mt-2 rounded'
                placeholder='Last Name'
              />
              {errors.lastname && (
                <p className='text-red-500'>{errors.lastname.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                {...register("email")}
                className='w-full outline-none border text-secondary-200 border-[#93A27B] focus:ring-1 focus:ring-[#93A27B] focus:border-[#93A27B] active:border-[#93A27B] py-2.5 px-4 mt-2 rounded'
                placeholder='name@email.com'
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                {...register("password")}
                className='w-full outline-none border text-secondary-200 border-[#93A27B] focus:ring-1 focus:ring-[#93A27B] focus:border-[#93A27B] active:border-[#93A27B] py-2.5 px-4 mt-2 rounded'
                placeholder='Password'
              />
              {errors.password && (
                <p className='text-red-500'>{errors.password.message}</p>
              )}
            </div>
            <button
              type='submit'
              className='bg-[#112F1B] hover:bg-[#77AC75]  text-[#F5B757] py-4 cursor-pointer font-bold uppercase tracking-wide rounded-full text-sm flex justify-center items-center'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span className='ml-2 text-xs'>Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-[#112F1B] dark:text-[#F5B757]'>
              Sign In
            </Link>
          </div>
          {error && (
            <div className='bg-red-200 text-red-800 py-2 px-4 mt-5 rounded'>
              {error.data.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
