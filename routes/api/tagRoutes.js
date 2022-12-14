const router = require('express').Router();
const { Product, Tag, ProductTag } = require('../../models');

// GET request for /api/tags
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product, through: ProductTag, as: 'products' }]
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// individual GET request for /api/tags/:id
// include Product model through Product Tag
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'products' }]
        });

        // if id does not exist, then print error
        if (!tagData) {
            res.json(404).json({ message: 'No tag found with this id!' });
            return;
        }

        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// POST request to add to tags
router.post('/', async (req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData)
    } catch (err) {
        res.status(400).json(err)
    }
})

// PUT request to update a tags by id parameter
router.put('/:id', async (req, res) => {
    try {
        const tagData = await Tag.update(
            {
                tag_name: req.body.tag_name
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        // if id does not exist, then print error
        if (!tagData) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }

        res.status(200).json(tagData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE request by referencing id parameter
router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id
            }
        })

        // if id does not exist, then print error
        if (!tagData) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }

        res.status(200).json(tagData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;