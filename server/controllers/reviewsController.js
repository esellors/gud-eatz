module.exports = {
    getAll: async (req, res) => {
        const restId = +req.params.restId;
        const db = req.app.get('db');

        let reviews;
        try {
            reviews = await db.reviews.getAll(restId);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).json(reviews)
    },
    add: async (req, res) => {
        const {restaurant_id, review, rating} = req.body;
        const {userId} = req.session.user;
        const db = req.app.get('db');
        console.log(req.body)
        console.log(userId)

        const reviews = await db.reviews.add(restaurant_id, userId, review, rating);

        res.status(200).json(reviews)
    },
    edit: async (req, res) => {
        const { editedReview } = req.body; 
        const restId = +req.params.restId;
        const revId = +req.params.revId;
        const db = req.app.get('db');

        const reviews = await db.reviews.edit(restId, revId, editedReview); 

        res.status(200).json(reviews)
    },
    delete: async (req, res) => {
        const restId = +req.params.restId;
        const revId = +req.params.revId;
        const db = req.app.get('db');

        const reviews = await db.reviews.delete(restId, revId);

        res.status(200).json(reviews)
    }
}