import React from 'react';
import { connect } from 'react-redux';
import {logoutUser} from '../redux/reducers/userReducer';
import {withRouter} from 'react-router-dom';

function Header(props) {
    const {userId} = props;

    return (
        <div id='header'>
            <h2>gud EATZ</h2>
            {
                userId ? <button onClick={() => {
                    props.logoutUser()
                        .then(() => props.history.push('/'));
                }}>Logout</button> : null
            }
        </div>
    )
}

const mapStateToProps = reduxState => {
    return {
        userId: reduxState.userReducer.userId
    }
}

export default withRouter(connect(mapStateToProps, {
    logoutUser
})(Header))
