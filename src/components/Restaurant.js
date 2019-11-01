import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getOne} from '../redux/reducers/restaurantReducer';
import {getAll, addReview} from '../redux/reducers/reviewsReducer';
import AlterReview from './AlterReview';

class Restaurant extends Component {
    state = {
        review: '',
        rating: null
    }
    componentDidMount() {
        this.props.getOne(this.props.match.params.restId);

        this.props.getAll(this.props.match.params.restId)
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleAddReview = () => {
        const {review, rating} = this.state;
        this.props.addReview({
            review, 
            rating, 
            restaurant_id: this.props.match.params.restId
        });
    }
    render() {
        console.log(this.props)

        const {restaurant, reviews} = this.props;

        const reviewsMapped = reviews.map((review, index) => {
            return (
                <div key={index}>
                    <p>Review Date: {review.review_date}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Review: {review.review_text}</p>
                    {
                        this.props.userId === review.user_id || this.props.isAdmin
                        ? <AlterReview 
                            revId={review.review_id} 
                            restId={this.props.match.params.restId}
                            /> : null
                    }
                </div>
            )
        })
 
        return (
            <div>
                <button onClick={() => this.props.history.goBack()} >Back</button>
                <h1>{restaurant.rest_name}</h1>
                <h4>Average meal price: {restaurant.rest_price}</h4>
                <div>
                    <input
                        name='review'
                        placeholder='Enter your review description'
                        onChange={this.handleChange}
                    />
                    <input
                        name='rating'
                        type='number'
                        max='5'
                        placeholder='1 - 5 rating'
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleAddReview}>Submit</button>
                </div>
                {reviewsMapped}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userId: reduxState.userReducer.userId,
        restaurant: reduxState.restaurantReducer.restaurant,
        reviews: reduxState.reviewsReducer.reviews,
        isAdmin: reduxState.userReducer.isAdmin
    }
}

export default connect(mapStateToProps, {
    getOne,
    getAll,
    addReview
})(Restaurant)