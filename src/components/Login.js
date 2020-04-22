import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { updateLoginForm } from '../actions/loginForm.js'
import { login } from '../actions/currentUser.js'

const Login = ({loginForm, updateLoginForm, login}) => {

    const handleChange = e => {
        const {name, value} = e.target 
        let loginFormData = {
            ...loginForm,
            [name]: value
        }
        updateLoginForm(loginFormData)
    }

    const handleSubmit = e => {
        console.log(e)
        e.preventDefault()
        login(loginForm)
    }


    return (
        <div className="formInfo">
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input fluid name='email' label="Email" placeholder='Email' value={loginForm.email} onChange={handleChange} />
                    <Form.Input fluid type="Password" name='password' label="Password" placeholder='Password' value={loginForm.password} onChange={handleChange} />
                </Form.Group>
                <Form.Checkbox label='I agree to the Terms and Conditions' />
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

//returns a props object from store with a key loginForm and values: {email: "", password: ""} that can be destructured
const mapStateToProps = state => {
    return {
        loginForm: state.loginForm
    }
}

export default connect(mapStateToProps, {updateLoginForm, login})(Login)
