import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import { deleteUser, updateUser } from '../services/userService.js'
import auth from '../services/authService'
import Form from './../components/common/Form';

function EditUser(props) {
    const [ data, setData ] = useState({ 
        originalUsername: '', 
        username: '', 
        email: '', 
        password: ''
    })
    const [ errors, setErrors ] = useState({})

    const schema = {
        username: Joi.string().required().label('Username'),
        originalUsername: Joi.string().required(),
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().min(5).max(15).required()
    }

    const id = props.match.params.id

    const assignData = () => {
        const newData = {...data}
        for (const attr in newData) { newData[attr] = props.user[attr]}
        newData.password = ''
        newData.originalUsername = props.user.username
        setData(newData)
    }

    const prevUser = useRef();

    useEffect(() => {
        prevUser.current = props.user
        if(props.user) assignData();
    }, [props.user])
    
    useEffect(() => {
        if (prevUser.current===undefined && props.user) assignData();
    }, [prevUser, props.user])

    const handleDelete = async () => {
        try {
            await deleteUser(id)
            toast.success('User deleted.')
            auth.logout()
            window.location = '/';
        } catch (err) {
            if(err.response && err.response.status === 404) {
                alert("File already deleted.")
            }
        }
    }

    const doSubmit = async () => {
        try {
            await updateUser(id, data)
            props.onUpdateUser(data.username, data.password)
        } catch (err) {
            if(err.response && err.response.status === 400) {
            const newErrors = { ...errors };
            newErrors.username = err.response.data;
            setErrors(newErrors)
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
        <div>
            <h1 className="mx-auto mb-5">Edit User</h1>
            <button onClick={()=>handleDelete()} className="btn btn-block btn-danger col-4 mx-auto mt-4">Delete User</button>
            <form onSubmit={(e) => Form.handleSubmit(formProps, doSubmit, e)} className="col-6 mx-auto">
                {Form.renderInput('username', 'Username', formProps)}
                {Form.renderInput('email', 'Email', formProps)}
                {Form.renderInput('password', 'Password', formProps, 'password')}
                {Form.renderButton('Submit', formProps)}
            </form>
        </div>
    )
}

export default EditUser