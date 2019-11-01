INSERT INTO review (restaurant_id, user_id, review_text, rating)
VALUES ($1, $2, $3, $4);

SELECT * FROM review
WHERE restaurant_id = $1;