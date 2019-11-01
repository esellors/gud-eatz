import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editReview, deleteReview} from '../redux/reducers/reviewsReducer';

class AlterReview extends Component {
    state = { review: '' }

    handleInput = e => {
        this.setState({ review: e.target.value});
    }
    handleEditSubmit = () => {
        const {revId, restId} = this.props;
        const {review} = this.state;

        this.props.editReview(restId, revId, {editedReview: review});
    }
    render() {
        const {revId, restId} = this.props;

        return (
            <>
                <input onChange={this.handleInput} />
                <button onClick={this.handleEditSubmit}>Submit Edit</button>

                <br />

                <button onClick={() =>this.props.deleteReview(restId, revId)}>Delete</button>
            </>
        )
    }
}

export default connect(null, {
    editReview,
    deleteReview
})(AlterReview);