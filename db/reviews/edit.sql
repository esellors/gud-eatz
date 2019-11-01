UPDATE review
SET review_text = $3
WHERE review_id = $2;

SELECT * FROM review
WHERE restaurant_id = $1;