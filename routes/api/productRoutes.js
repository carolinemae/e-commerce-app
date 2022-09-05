const router = require('express').Router();
const { Product, Tag, ProductTag } = require('../../models');

// GET request for /api/products
router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll({
            include: [{ model: Tag, through: ProductTag, as: 'tags' }]
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// individual GET request for /api/products/:id
// include Tag model through ProductTag model
router.get('/:id', async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id, {
            include: [{ model: Tag, through: ProductTag, as: 'tags' }]
        });

        // if id does not exist, then print error
        if (!productData) {
            res.json(404).json({ message: 'No product found with that id!' });
            return;
        }

        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// POST request to add to products
router.post('/', async (req, res) => {
    try {
        const productData = await Product.create(req.body);
        res.status(200).json(productData)
    } catch (err) {
        res.status(400).json(err)
    }
})

// PUT request to update a product by id parameter
router.put('/:id', async (req, res) => {
    try {
        const productData = await Product.update(
            {
                product_name: req.body.product_name,
                price: req.body.price,
                stock: req.body.stock
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        // if id does not exist, then print error
        if (!productData) {
            res.status(404).json({ message: 'No product found with that id!' });
            return;
        }

        res.status(200).json(productData)
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE request by referencing id parameter
router.delete('/:id', async (req, res) => {
    try {
        const productData = await Product.destroy({
            where: {
                id: req.params.id
            }
        });

        // if id does not exist, then print error
        if (!productData) {
            res.status(404).json({ message: 'No product found with that id!' });
            return;
        }

        res.status(200).json(productData)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;