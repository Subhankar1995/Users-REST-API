export const createUserQuery = 'INSERT INTO userlist (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

export const loginUserQuery = 'SELECT id, email, password FROM userlist WHERE email = $1'

export const getUserQuery = 'SELECT id, email, name FROM userlist WHERE id = $1'

export const checkEmailAvailableQuery = 'SELECT COUNT(*) FROM userlist WHERE email = $1';

export const updateUserDetailsQuery = 'UPDATE userlist SET name = $2, email= $3, password = $4 WHERE id = $1 RETURNING *';

export const deleteUserQuery = 'DELETE FROM userlist WHERE id = $1';