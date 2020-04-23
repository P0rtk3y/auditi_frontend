import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/currentUser.js'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Logout = ({logout}) => {
    return (
        <Button color='grey' className="logoutButton" fluid onClick={logout}>
            <Link to='/logout'>Logout</Link>
        </Button>
    )
}
export default connect(null, {logout})(Logout)