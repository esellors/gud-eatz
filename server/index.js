require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const authController = require('./controllers/authController');
const restaurantController = require('./controllers/restaurantController');
const reviewsController = require('./controllers/reviewsController');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Hey, the db is up');
});

// AUTH ENDPOINTS
app.post('/auth/user/new', authController.register); // registering
app.post('/auth/user/login', authController.login) // login
app.post('/auth/user/logout', authController.logout) // logout

// RESTAURANT ENDPOINTS
app.get('/api/restaurants', restaurantController.getAll) // get list of restaurants
app.get('/api/restaurants/:restId', restaurantController.getOne) // get one 

// REVIEWS ENDPOINTS
app.post('/api/reviews', reviewsController.add) // user can add review
app.get('/api/reviews/:restId', reviewsController.getAll) // get reviews for a restaurant
app.put('/api/reviews/:restId/:revId', reviewsController.edit) // user can edit their review
app.delete('/api/reviews/:restId/:revId', reviewsController.delete) // user or admin can delete review

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));