import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { updateSignupForm } from '../actions/signupForm.js'
import { signup } from '../actions/currentUser.js'

const Signup = ({signupForm, updateSignupForm, signup}) => {

    const handleChange = e => {
        const {name, value} = e.target 
        let signupFormData = {
            ...signupForm,
            [name]: value
        }
        updateSignupForm(signupFormData)
    }

    const handleSubmit = e => {
        e.preventDefault()
        signup(signupForm)
    }



    return (
        <div className="formInfo">
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input name='firstname' label="Firstname" placeholder='Firstname' value={signupForm.firstname} onChange={handleChange} />
                    <Form.Input name='lastname' label="Lastname" placeholder='Lastname' value={signupForm.lastname} onChange={handleChange} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid name='email' label="Email" placeholder='Email' value={signupForm.email} onChange={handleChange} />
                    <Form.Input fluid type="Password" name='password' label="Password" placeholder='Password' value={signupForm.password} onChange={handleChange} />
                </Form.Group>
                <Form.Checkbox label='I agree to the Terms and Conditions' />
                <Button type='submit' floated='right' color='orange'>Submit</Button>
                <br></br>
                <br></br>
            </Form>
        </div>
    )
}

//returns a props object from store with a key loginForm and values: {email: "", password: ""} that can be destructured
const mapStateToProps = state => {
    return {
        signupForm: state.signupForm
    }
}

export default connect(mapStateToProps, {updateSignupForm, signup})(Signup)