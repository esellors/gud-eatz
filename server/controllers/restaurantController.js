module.exports = {
    getAll: async (req, res) => {
        const db = req.app.get('db');

        let restaurants;
        try {
            restaurants = await db.restaurants.getAll();
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'Error retrieving restaurants'});
        }

        res.status(200).json(restaurants);
    },
    getOne: async (req, res) => {
        const restId = +req.params.restId;
        const db = req.app.get('db');

        const restaurant = await db.restaurants.getOne(restId);

        res.status(200).json(restaurant[0]);
    }
}