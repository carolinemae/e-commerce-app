const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

// Product belongs to many tag models? Not sure if this is correct?
Product.belongsToMany(Tag, {
    through: {
        model: ProductTag,
        unique: false
    },
    as: 'product_tags'
});

Tag.belongsToMany(Product, {
    through: {
        model: ProductTag,
        unique: false
    },
    as: 'tagged_products'
});

module.exports = { Product, Category, Tag };