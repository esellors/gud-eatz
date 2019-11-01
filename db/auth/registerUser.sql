INSERT INTO users3 (first_name, last_name, age, email, hash, isAdmin)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;