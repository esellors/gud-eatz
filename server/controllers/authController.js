const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const{first_name, last_name, age, email, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.auth.checkForEmail(email)

        if (foundUser[0]) {
            res.status(409).json({message: 'Username taken'})
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await db.auth.registerUser(first_name, last_name, age, email, hash, 'false');

            req.session.user = {
                userId: newUser[0].user_id,
                firstName: newUser[0].first_name,
                lastName: newUser[0].last_name,
                isAdmin: newUser[0].isadmin
            };

            res.status(200).json(req.session.user)
        }
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.auth.checkForEmail(email);

        if (!foundUser[0]) {
            res.status(403).json({message: "Username not found"});
        } else {
            const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash)
            console.log(foundUser)

            if (!isAuthenticated) {
                res.status(403).json({message: 'Password is incorrect'})
            } else {
                req.session.user = {
                    userId: foundUser[0].user_id,
                    firstName: foundUser[0].first_name,
                    lastName: foundUser[0].last_name,
                    isAdmin: foundUser[0].isadmin
                }

                res.status(200).json(req.session.user);
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}