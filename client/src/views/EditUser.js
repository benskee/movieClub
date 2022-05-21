import React from 'react'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import { deleteUser, updateUser } from '../services/userService.js'
import auth from '../services/authService'
import Form from './../components/common/Form';

export default class EditUser extends Form {
    state = {
        errors: {},
        data: { originalUsername: '', username: '', email: '', password: ''}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        originalUsername: Joi.string().required(),
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().min(5).max(15).required()
    }

    id = this.props.match.params.id

    assignData() {
        const newData = {...this.state.data}
        for (const attr in newData) { newData[attr] = this.props.user[attr]}
        newData.password = ''
        newData.originalUsername = this.props.user.username
        this.setState({
            data: newData
        })
    }

    componentDidMount() {
        if(this.props.user) {
            this.assignData()
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.user===undefined && this.props.user) {
            this.assignData()
        }
    }

    handleDelete = async () => {
        try {
            await deleteUser(this.id)
            toast.success('User deleted.')
            auth.logout()
            window.location = '/';
        } catch (err) {
            if(err.response && err.response.status === 404) {
                alert("File already deleted.")
            }
        }
    }

    doSubmit = async () => {
        try {
            const { data } = this.state
            await updateUser(this.id, data)
            this.props.onUpdateUser(data.username, data.password)
        } catch (err) {
            if(err.response && err.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = err.response.data;
            this.setState({ errors })
            }

        }
    }

    render() {
        return (
            <div>
                <h1 className="mx-auto mb-5">Edit User</h1>
                <button onClick={()=>this.handleDelete()} className="btn btn-block btn-danger col-4 mx-auto mt-4">Delete User</button>
                <form onSubmit={this.handleSubmit} className='col-6 mx-auto'>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('email', 'Email')}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Submit")}
                </form>
            </div>
        )
    }
}
