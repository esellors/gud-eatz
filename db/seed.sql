CREATE TABLE users3 (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(75) NOT NULL,
  last_name VARCHAR(75) NOT NULL,
  age INT NOT NULL,
  email VARCHAR(140) NOT NULL,
  isAdmin BOOL NOT NULL,
  hash TEXT NOT NULL
);

CREATE TABLE restaurant (
  restaurant_id SERIAL PRIMARY KEY,
  rest_name TEXT NOT NULL,
  rest_category TEXT NOT NULL,
  location_street TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  rest_phone TEXT NOT NULL,
  rest_price INTEGER NOT NULL,
  rest_img TEXT NOT NULL
);

CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurant(restaurant_id) NOT NULL,
  user_id INT REFERENCES users3(user_id) NOT NULL,
  review_date DATE default CURRENT_DATE,
  review_text VARCHAR(140) NOT NULL,
  rating INT NOT NULL
);