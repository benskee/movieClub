import React, { useState } from 'react';
import Joi from 'joi-browser';
import Form from '../components/common/Form';
import { register } from '../services/userService'
import auth from '../services/authService'
import WelcomeBanner from './../components/welcome/WelcomeBanner';

function Register() {
    const [ data, setData ] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    })
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false);

    const schema = {
        username: Joi.string().required().label('Username'),
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().min(5).max(15).required().label('Password'),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    }

    const doSubmit = async () => {
        setSubmitted(true)
        try {
            const response = await register(data);
            auth.loginWithJwt(response.headers["x-auth-token"])
            window.location = '/projects'
        } catch (err) {
            if(err.response && err.response.status === 400) {
            const newErrors = { ...errors };
            const { type, message } = err.response.data
            newErrors[type] = message;
            setErrors({ newErrors })
            }
        }
    }

    const formProps = {
        data,
        setData,
        errors,
        setErrors,
        schema
    }

    return (
         <div className='row'>
            <img className="image-fluid col-5 welcome-image d-none d-lg-flex" src="./static/images/hexagon_warp.jpg" alt="hexagon_warp" />
            <div className="container col-7 mx-auto">
                <WelcomeBanner text={"Already have an account?"} link={"/login"} buttonLabel={"Login"} />
                <h1 className='m-3 mb-2'>Register</h1>
                <form onSubmit={(e) => Form.handleSubmit(formProps, doSubmit, e)}>
                    {Form.renderInput("username", "Username", formProps)}
                    {Form.renderInput("email", "Email", formProps)}
                    {Form.renderInput("password", "Password", formProps, "password")}
                    {Form.renderConfirmPassword("confirmPassword", "Confirm Password", formProps)}
                    {Form.renderButton('Register', formProps)}
                </form>
            </div>
        </div>
    )
}

export default Register
