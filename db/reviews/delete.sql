DELETE FROM review
WHERE review_id = $2;

SELECT * FROM review
WHERE restaurant_id = $1;