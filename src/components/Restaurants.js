import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll } from '../redux/reducers/restaurantReducer';

class Restaurants extends Component {
    componentDidMount() {
        this.props.getAll();
    }
    render() {

        const restaurantsMapped = this.props.restaurants.map((restaurant, index) => {
            return (
                <Link to={`/restaurant/${restaurant.restaurant_id}`} key={index}>
                    <div>
                        <h1>{restaurant.rest_name}</h1>
                        <img style={{ width: '100px' }} src={`${restaurant.rest_img}`} />
                        <h4>{restaurant.rest_category}</h4>
                        <p>{restaurant.location_street}, {restaurant.location_city}, {restaurant.location_state}</p>
                        <p>{restaurant.rest_phone}</p>
                    </div>
                </Link>
            )
        })

        return (
            <div>
                <h2>Restaurants</h2>
                {restaurantsMapped}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        restaurants: reduxState.restaurantReducer.restaurants
    }
}

export default connect(mapStateToProps, {
    getAll
})(Restaurants)