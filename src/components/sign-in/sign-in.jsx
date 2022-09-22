import React from 'react'
import './sign-in.css';
import content2 from '../../static/index2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape(
    {
        fullname: yup.string().required().min(6),
        email: yup.string().required("please enter a valid email"),
        password: yup.string().required("please enter password").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One number and one special case Character"
        )
    }
)


const SignIn = () => {
    const { register, handleSubmit, formState: {errors}, } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = (data) => console.log(data)
  return (
    <div className='sign-in'>
        <h1>Have an account already</h1>
        <h3>Sign in here!</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            {content2.inputs.map((input, key) => {
                return (
                    <div key={key}>
                        <label htmlFor={input.name}>{input.label}</label>
                        <br />
                        <input type={input.type} name={input.name} {...register(input.name)} />
                        <br />
                        <span className='message'>{errors[input.name]?.message}</span>
                    </div>
                )
            })}

            <Link to="/scrumboard"><button>SIGN IN</button></Link>
        </form>
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        <p><Link to='/'>Back to Home</Link></p>
    </div>
  )
}

export default SignIn