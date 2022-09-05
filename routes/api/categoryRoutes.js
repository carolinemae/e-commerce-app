const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET request for /api/categories
router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }]
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// individual GET request for /api/categories/:id
// include Product model
router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }]
        });

        // if id does not exist, then print error
        if (!categoryData) {
            res.json(404).json({ message: 'No category found with that id!' });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// POST request to add to categories
router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData)
    } catch (err) {
        res.status(400).json(err)
    }
})

// PUT request to update a category by id parameter
router.put('/:id', async (req, res) => {
    try {
        const categoryData = await Category.update(
            {
                category_name: req.body.category_name
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        // if id does not exist, then print error
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with that id!' });
            return;
        }

        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE request by referencing id parameter
router.delete('/:id', async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });

        // if id does not exist, then print error
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with that id!' });
            return;
        }

        res.status(200).json(categoryData)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;